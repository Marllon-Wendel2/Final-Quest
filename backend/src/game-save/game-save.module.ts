import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { GameSaveController } from './game-save.controller';
import { GameSaveService } from './game-save.service';
import { EventStoreService } from './event-store.service';
import { ActionQueue } from './action-queue';
import { ActionWorker } from './action.worker';
import { ActionProcessor } from './action.processor';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import {
  GAME_ACTION_QUEUE,
  GAME_ACTION_QUEUE_CONFIG,
} from './game-save.constants';

function parseRedisConfig() {
  const url = process.env.REDIS_URL;
  if (url) return { url, maxRetriesPerRequest: null, enableReadyCheck: false };
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  };
}

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    BullModule.forRoot({ connection: parseRedisConfig() }),
    BullModule.registerQueue({
      name: GAME_ACTION_QUEUE,
      defaultJobOptions: GAME_ACTION_QUEUE_CONFIG.defaultJobOptions,
    }),
  ],
  controllers: [GameSaveController],
  providers: [
    GameSaveService,
    EventStoreService,
    ActionQueue,
    ActionWorker,
    ActionProcessor,
  ],
  exports: [GameSaveService],
})
export class GameSaveModule {}
