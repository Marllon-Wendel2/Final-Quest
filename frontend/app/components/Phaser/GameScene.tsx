
import Phaser from 'phaser';
import { configControls, createControls } from '../animations/Phaser/player/controls';
import { MapManager } from './core/MapManager';
import { EntityManager } from './core/EntityManager';
import { InteractionManager } from './core/InteractionManager';
import { Door } from '../animations/Phaser/doors/door';
import UIScene from './ui/UIScene';
import { createGhost } from '../animations/Phaser/animes/ghost';
import { createAdventurer } from '../animations/Phaser/animes/adventurer';
import { eventBus } from './core/EventBus';
import InventoryScene from './invetory/InventoryScene';
import { getGameState, sendGameAction } from '@/api/game-api';
import { GoldPickup } from '../animations/Phaser/minerals/gold';

export default class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
    private mapManager!: MapManager;
    private entityManager!: EntityManager;
    private interactionManager!: InteractionManager;
    private doors: Door[] = [];
    private ghost!: ReturnType<typeof createGhost>;
    private adventurerMale!: ReturnType<typeof createAdventurer>;
    private lastSavedPos = { x: 0, y: 0 };
    private lastSavedAdvPos = { x: 0, y: 0 };
    private saveDebounce = 0;
    private saveAdvDebounce = 0;
    private interactKey!: Phaser.Input.Keyboard.Key;

    private golds: GoldPickup[] = [];
    private activeGold: GoldPickup | null = null;
    private wasDialoguePlaying = false;

    private team: string[] = ['ocultist'];
    private adventurerFollowing = false;
    private pendingDeliveryRecruit = false;

    constructor() {
      super('GameScene');
    }

    async create() {
      this.cameras.main.setViewport(0, 0, 720, 620);
      // 1. Setup do mapa
      this.mapManager = new MapManager(this);
      const { map, grassLayer, waterLayer, roadsLayer, treesLayer } = this.mapManager.create();
      // 2. Criacao de entidades
      this.entityManager = new EntityManager(this);

      // Carregar posição salva do backend
      const savedState = await getGameState();
      const deliveryCompleted = savedState?.missions?.some(
        (m) => m.id === 'mission-adventurer-delivery' && m.completed
      );

      // Restaurar team e follower do savedState
      const shouldFollow = deliveryCompleted || savedState?.team?.includes('aventureiro');
      if (shouldFollow) {
        this.team = ['ocultist', 'aventureiro'];
        this.adventurerFollowing = true;
      }

      const startX = savedState?.player?.x ?? 150;
      const startY = savedState?.player?.y ?? 360;
      const startDir = savedState?.player?.direction ?? 'right';

      this.player = this.entityManager.createPlayer(startX, startY, startDir);

      this.golds = this.entityManager.createMinerals(map);
      const flags = savedState?.flags || {};
      this.golds = this.golds.filter((gold) => {
        if (flags[gold.id]) {
            // Gold ja foi coletado - destruir sprite e overlap
            gold.sprite.destroy();
            gold.overlap.destroy();
            return false;  // Remove do array
        }
        return true;  // Mantem no array
      });

      this.golds.forEach((gold) => {
        this.physics.add.collider(this.player, gold.collider);
      });

      const buildings = this.entityManager.createBuildings(map);
      this.entityManager.createLamb(60.67, 198);
      this.doors = this.entityManager.createDoors(map);
      // Criar minerais
      // 3. Criar ghost (precisa de logica especial para NPC layer)
      const npcLayer = map.getObjectLayer('NPC');
      if (npcLayer) {
        npcLayer.objects.forEach((obj) => {
          if (obj.name === 'Fantasma' && obj.x !== undefined && obj.y !== undefined) {
            this.ghost = this.entityManager.createGhost(obj.x, obj.y);
          }

          if (obj.name === 'aventureiro' && obj.x !== undefined && obj.y !== undefined) {
              const savedAdv = savedState?.adventurer;
              // Compensar offset de -20 do createAdventurer ao restaurar posição salva
              const advX = savedAdv ? savedAdv.x + 20 : obj.x;
              const advY = savedAdv ? savedAdv.y : obj.y;
              this.adventurerMale = this.entityManager.createAventurer(advX, advY);
          }
        });
      }
      // 4. Configurar colisoes
      this.physics.add.collider(this.player, waterLayer);
      this.physics.add.collider(this.player, grassLayer);
      this.physics.add.collider(this.player, roadsLayer);
      if (treesLayer) this.physics.add.collider(this.player, treesLayer);
      this.physics.add.collider(this.player, buildings);
      
      // 5. Configurar interacoes
      this.interactionManager = new InteractionManager(this);
      this.interactionManager.setupDoorInteraction(this.doors, this.player);

      if (this.ghost) {
        this.interactionManager.setupGhostProximity(this.ghost);
        this.physics.add.collider(this.player, this.ghost.collider);
        this.physics.add.overlap(this.player, this.ghost.overlap, () => {
          this.interactionManager.onGhostCollide(this.ghost);
        });
      }

      if (this.adventurerMale && !this.adventurerFollowing) {
        this.physics.add.collider(this.player, this.adventurerMale.collider);
        this.physics.add.overlap(this.player, this.adventurerMale.overlap, () => {
          this.interactionManager.onAdventurerCollide(this.adventurerMale);
        });
      }

      // 6. Configurar input
      this.controls = createControls(this);
      if (this.input.keyboard) {
          this.interactKey = this.input.keyboard.addKey('Z');
      }

      eventBus.on('dialogue:start', () => {
        this.player.setVelocity(0, 0);
        this.player.anims.stop();
      });

      eventBus.on('delivery:completed', () => {
        this.pendingDeliveryRecruit = true;
      });

      eventBus.on('dialogue:end', () => {
        if (this.pendingDeliveryRecruit && !this.adventurerFollowing && this.adventurerMale) {
          this.pendingDeliveryRecruit = false;
          this.enableAdventurerFollower();
        }
      });

      // 7. UI - mensagem de boas-vindas apenas para novos jogadores
      if (!savedState) {
        this.time.delayedCall(100, () => {
          const ui = this.scene.get('UIScene') as UIScene;
          ui.playScript([
            { type: 'text', text: 'Bem-vindo, Ocultista!', speaker: 'Narrador (não confie muito)' },
            { type: 'text', text: 'Va para o culto na proxima cidade!', speaker: 'Narrador (não confie muito)' },
          ]);
        });
      }
    }

    update(time: number) {
      if (!this.player || !this.controls) return;

      // Controle de movimento (travado enquanto dialogo ou ghost ativo)
      const ui = this.scene.get('UIScene') as UIScene;
      const inventory = this.scene.get('InventoryScene') as InventoryScene;

      const dialoguePlaying = ui.getIsPlaying();
      const dialogueJustEnded = this.wasDialoguePlaying && !dialoguePlaying;
      this.wasDialoguePlaying = dialoguePlaying;
      const inventoryOpen = inventory.isInventoryOpen();

      if (!dialoguePlaying && !inventoryOpen) {
        configControls(this.player, this.controls, this);
      } else {
        this.player.setVelocity(0, 0);
      }

      const isInteractPressed = Boolean(
        this.interactKey && Phaser.Input.Keyboard.JustDown(this.interactKey)
      );


      // Atualizar interacoes (ignorar se dialogo acabou de fechar neste frame)
      this.interactionManager.update(
        this.player,
        this.doors,
        this.ghost,
        isInteractPressed && !dialogueJustEnded,
        dialoguePlaying
      );

      // Salvar posição periodicamente (a cada 2s se houve movimento)
      const px = Math.round(this.player.x);
      const py = Math.round(this.player.y);
      if (
        time > this.saveDebounce &&
        (px !== this.lastSavedPos.x || py !== this.lastSavedPos.y)
      ) {
        this.saveDebounce = time + 2000;
        this.lastSavedPos = { x: px, y: py };
        const dir = this.player.getData('direction') || 'right';
        sendGameAction('PLAYER_MOVED', { x: px, y: py, direction: dir });
      }

      this.activeGold = null;
      this.golds.forEach((gold) => {
          const isOverlapping = Phaser.Geom.Intersects.RectangleToRectangle(
              this.player.getBounds(),
              gold.overlap.getBounds()
          );
          if (isOverlapping) {
              this.activeGold = gold;
          }
      });

      // Coletar gold se tecla de interacao pressionada
      if (this.activeGold && isInteractPressed && !dialogueJustEnded) {
          this.collectGold(this.activeGold);
      }

      if (this.adventurerFollowing && this.adventurerMale) {
        this.updateFollower();

        // Salvar posição do aventureiro periodicamente (a cada 2s se houve movimento)
        const ax = Math.round(this.adventurerMale.sprite.x);
        const ay = Math.round(this.adventurerMale.sprite.y);
        if (
          time > this.saveAdvDebounce &&
          (ax !== this.lastSavedAdvPos.x || ay !== this.lastSavedAdvPos.y)
        ) {
          const aDir = this.adventurerMale.sprite.getData('direction') || 'down';
          sendGameAction('ADVENTURER_MOVED', { x: ax, y: ay, direction: aDir });
          this.lastSavedAdvPos = { x: ax, y: ay };
          this.saveAdvDebounce = time + 2000;
        }
      }

    }

    private async collectGold(gold: GoldPickup): Promise<void> {
      // 1. Enviar ITEM_COLLECTED ao backend
      const gameState = await getGameState();
      const nextSlot = gameState?.inventory?.length ?? 0;
      await sendGameAction('ITEM_COLLECTED', {
          slot: nextSlot,
          itemId: 'item_gold',
      });

      // 2. Enviar FLAG_SET ao backend
      await sendGameAction('FLAG_SET', {
          key: gold.id,
          value: true,
      });

      // 3. Notificar narrador
      const ui = this.scene.get('UIScene') as UIScene;
      ui.playScript([{
          type: 'text',
          text: 'Voce coletou ouro! +1 ouro',
          speaker: 'Narrador',
          speakerColor: 'font_gold',
      }]);

      // 4. Destruir gold do mapa
      gold.sprite.destroy();
      gold.overlap.destroy();
      gold.collider.destroy();

      // 5. Remover do array
      this.golds = this.golds.filter((g) => g.id !== gold.id);

      // 6. Limpar gold ativo
      this.activeGold = null;

      // 7. Sincronizar inventario
      const inventory = this.scene.get('InventoryScene') as InventoryScene;
      inventory.syncInventoryWithBackend();
    }

    private async enableAdventurerFollower(): Promise<void> {
      if (this.adventurerFollowing) return;
      this.adventurerFollowing = true;
      this.team = ['ocultist', 'aventureiro'];
      // Destruir zones de colisão — ele vai seguir, não bloquear
      this.adventurerMale.collider?.destroy();
      this.adventurerMale.overlap?.destroy();
      // Persistir no backend
      await sendGameAction('TEAM_UPDATED', { team: this.team });
    }

    private updateFollower(): void {
      const dir = this.player.getData('direction') || 'down';
      const adv = this.adventurerMale;
      const OFFSET = 20;    // pixels atrás do player
      const LERP = 0.05;    // fator de interpolação
      let targetX = this.player.x;
      let targetY = this.player.y;
      switch (dir) {
          case 'down':  targetY -= OFFSET; break;
          case 'up':    targetY += OFFSET; break;
          case 'left':  targetX += OFFSET; break;
          case 'right': targetX -= OFFSET + 20 ; break;
      }
      const dx = targetX - adv.sprite.x;
      const dy = targetY - adv.sprite.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 5) {
          const newX = adv.sprite.x + dx * LERP;
          const newY = adv.sprite.y + dy * LERP;
          adv.sprite.setPosition(newX, newY);
          adv.playRun(dir);
          adv.sprite.setData('direction', dir);
      } else {
          adv.playIdle(dir);
      }
    }
}