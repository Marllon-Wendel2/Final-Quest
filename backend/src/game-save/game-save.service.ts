import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

const REDIS_KEY_PREFIX = 'game:state:';

export interface GameState {
  version: number;
  userId: string;
  player: { x: number; y: number; direction: string };
  adventurer?: { x: number; y: number; direction: string };
  adventurerFemale?: { x: number; y: number; direction: string };
  inventory: Array<{ slotIndex: number; itemKey: string }>;
  flags: Record<string, boolean>;
  missions: Array<{
    id: string;
    type: string;
    label: string;
    target: string;
    current: number;
    required: number;
    completed: boolean;
  }>;
  team: string[];
  lastSaved: string;
}

@Injectable()
export class GameSaveService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async getCanonicalState(userId: string): Promise<GameState | null> {
    const redisKey = `${REDIS_KEY_PREFIX}${userId}`;
    const cached = await this.redis.get(redisKey);
    if (cached) return JSON.parse(cached) as GameState;

    const save = await this.prisma.gameSave.findUnique({ where: { userId } });
    if (save) {
      await this.redis.set(redisKey, JSON.stringify(save.state));
      return save.state as unknown as GameState;
    }
    return null;
  }

  async updateState(userId: string, newState: GameState): Promise<void> {
    const redisKey = `${REDIS_KEY_PREFIX}${userId}`;
    await this.redis.set(redisKey, JSON.stringify(newState));
    await this.prisma.gameSave.upsert({
      where: { userId },
      update: {
        state: newState as unknown as Prisma.InputJsonValue,
        version: newState.version,
      },
      create: {
        userId,
        state: newState as unknown as Prisma.InputJsonValue,
        version: newState.version,
      },
    });
  }

  createDefaultState(userId: string): GameState {
    return {
      version: 0,
      userId,
      player: { x: 150, y: 360, direction: 'right' },
      inventory: [],
      flags: {},
      missions: [],
      team: ['ocultist'],
      lastSaved: new Date().toISOString(),
    };
  }
}
