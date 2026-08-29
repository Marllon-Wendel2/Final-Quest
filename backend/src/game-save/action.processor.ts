import { Injectable, Logger } from '@nestjs/common';
import { GameSaveService, GameState } from './game-save.service';
import { EventStoreService } from './event-store.service';
import { Mission } from '@prisma/client';
import { GameActionType } from './dtos/addActionCommand.dto';

@Injectable()
export class ActionProcessor {
  private readonly logger = new Logger(ActionProcessor.name);

  constructor(
    private readonly gameSaveService: GameSaveService,
    private readonly eventStore: EventStoreService,
  ) {}

  async checkPrerequisites(
    userId: string,
    mission: Mission,
  ): Promise<{ valid: boolean; reason?: string }> {
    if (!mission.requirements) return { valid: true };

    const state = await this.gameSaveService.getCanonicalState(userId);

    if (!state)
      return { valid: false, reason: 'Estado do jogo não encontrado' };

    const prereqs = mission.prerequisites as Record<string, unknown>;

    if (prereqs) {
      const hasFlag = state.flags[prereqs.flag as string] === true;

      if (!hasFlag) {
        return {
          valid: false,
          reason: `Pré-requisito não atendido: ${String(prereqs.flag)}`,
        };
      }
    }

    if (prereqs.missionId) {
      const prevMission = state.missions.find(
        (m) => m.id === prereqs.missionId,
      );
      if (!prevMission || !prevMission.completed) {
        return {
          valid: false,
          reason: 'Missão anterior não completada',
        };
      }
    }

    return {
      valid: false,
    };
  }

  async validateRequirements(userId: string, mission: Mission) {
    if (!mission.requirements) return { valid: true };

    const state = await this.gameSaveService.getCanonicalState(userId);

    if (!state)
      return { valid: false, reason: 'Estado do jogo não encontrado' };

    const req = mission.requirements as Record<string, unknown>;

    switch (mission.missionType) {
      case 'COLLECTION':
        return this.validateCollection(state, req);
      case 'BATTLE':
        return this.validateBattle(state, req);
      case 'DELIVERY':
        return this.validateDelivery(state, req);
      case 'DIALOGUE':
        return this.validateDialogue(state, req);
    }
  }

  async consumeItems(userId: string, requirements: Record<string, unknown>) {
    const state = await this.gameSaveService.getCanonicalState(userId);
    if (!state) throw new Error('Estado do jogo não encontrado');

    const itemKey = requirements.itemKey as string;
    const quantity = requirements.quantity as number;

    let removed = 0;
    const newInventory = state.inventory.filter((item) => {
      if (item.itemKey === itemKey && removed < quantity) {
        removed++;
        return false;
      }
      return true;
    });

    const newState = {
      ...state,
      inventory: newInventory,
      version: state.version + 1,
      lastSaved: new Date().toISOString(),
    };

    await this.gameSaveService.updateState(userId, newState);
  }

  private validateCollection(state: GameState, req: Record<string, unknown>) {
    const itemKey = req.itemKey as string;
    const quantity = req.quantity as number;

    const current = state.inventory.filter(
      (item) => item.itemKey === itemKey,
    ).length;

    return {
      valid: current >= quantity,
      reason:
        current < quantity
          ? `Faltam ${quantity - current}x ${itemKey}`
          : undefined,
      progress: { current, required: quantity },
    };
  }

  private validateBattle(
    state: GameState,
    req: Record<string, unknown>,
  ): {
    valid: boolean;
    reason?: string;
    progress?: { current: number; required: number };
  } {
    const enemyType = req.enemyType as string;
    const quantity = req.quantity as number;

    const flagKey = `defeated_${enemyType}_count`;
    const current = state.flags[flagKey]
      ? (state.flags[flagKey] as unknown as number)
      : 0;

    return {
      valid: current >= quantity,
      reason:
        current < quantity
          ? `Faltam derrotar ${quantity - current}x ${enemyType}`
          : undefined,
      progress: { current, required: quantity },
    };
  }

  private validateDialogue(
    state: GameState,
    req: Record<string, unknown>,
  ): { valid: boolean; reason?: string } {
    const npcId = req.npcId as string;
    const flagKey = `dialogue_${npcId}_completed`;
    const completed = state.flags[flagKey] === true;

    return {
      valid: completed,
      reason: !completed ? `Precisa falar com ${npcId}` : undefined,
    };
  }

  private validateDelivery(
    state: GameState,
    req: Record<string, unknown>,
  ): {
    valid: boolean;
    reason?: string;
    progress?: { current: number; required: number };
  } {
    const collectionResult = this.validateCollection(state, req);
    if (!collectionResult.valid) {
      return {
        ...collectionResult,
        reason: `Faltam ${collectionResult.progress.required - collectionResult.progress.current}x ${req.itemKey} para entregar`,
      };
    }
    return collectionResult;
  }

  async process(
    userId: string,
    command: { type: GameActionType; payload: Record<string, unknown> },
  ): Promise<{ success: boolean; state: GameState }> {
    let state = await this.gameSaveService.getCanonicalState(userId);
    if (!state) state = this.gameSaveService.createDefaultState(userId);

    const newState = this.applyCommand(state, command);

    await this.eventStore.save(
      userId,
      command.type,
      command.payload,
      newState.version,
    );
    await this.gameSaveService.updateState(userId, newState);

    this.logger.log(
      `Ação processada: user=${userId} type=${command.type} v${state.version}→v${newState.version}`,
    );
    return { success: true, state: newState };
  }

  private applyCommand(
    state: GameState,
    command: { type: GameActionType; payload: Record<string, unknown> },
  ): GameState {
    const newState = { ...state, version: state.version + 1 };
    newState.lastSaved = new Date().toISOString();

    switch (command.type) {
      case 'PLAYER_MOVED':
        newState.player = {
          x: command.payload.x as number,
          y: command.payload.y as number,
          direction: command.payload.direction as string,
        };
        break;
      case 'ITEM_COLLECTED':
        newState.inventory = [
          ...state.inventory,
          {
            slotIndex: command.payload.slot as number,
            itemKey: command.payload.itemId as string,
          },
        ];
        break;
      case 'ITEM_USED': {
        const itemKey = command.payload.itemKey as string;
        const quantity = (command.payload.quantity as number) || 1;
        let removed = 0;
        newState.inventory = state.inventory.filter((item) => {
          if (item.itemKey === itemKey && removed < quantity) {
            removed++;
            return false;
          }
          return true;
        });
        break;
      }
      case 'FLAG_SET':
        newState.flags = {
          ...state.flags,
          [command.payload.key as string]: command.payload.value as boolean,
        };
        break;
      case 'GHOST_ENCOUNTERED':
        newState.flags = { ...state.flags, hasSeenGhost: true };
        break;
      case 'ADVENTURER_TALKED':
        newState.flags = { ...state.flags, talkedToAdventurer: true };
        break;
      case 'MISSION_STARTED':
        newState.missions = [
          ...state.missions,
          {
            id: command.payload.missionId as string,
            type: command.payload.missionType as string,
            label: command.payload.label as string,
            target: command.payload.target as string,
            current: 0,
            required: command.payload.required as number,
            completed: false,
          },
        ];
        break;
      case 'MISSION_PROGRESS':
        newState.missions = state.missions.map((m) =>
          m.id === command.payload.missionId
            ? { ...m, current: command.payload.progress as number }
            : m,
        );
        break;
      case 'MISSION_COMPLETED':
        newState.missions = state.missions.map((m) =>
          m.id === command.payload.missionId
            ? { ...m, completed: true, current: m.required }
            : m,
        );
        break;
      case 'TEAM_UPDATED': {
        newState.team = command.payload.team as string[];
        break;
      }
      case 'ADVENTURER_MOVED':
        newState.adventurer = {
          x: command.payload.x as number,
          y: command.payload.y as number,
          direction: command.payload.direction as string,
        };
        break;
    }
    return newState;
  }
}
