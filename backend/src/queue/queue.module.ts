import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RankingModule } from 'src/ranking/ranking.module';
import { MISSION_QUEUE, QUEUE_CONFIG } from './queue.constantes';
import { QueueMonitorController } from './queue.monitor.controller';
import { MissionQueue } from './mission.queue';
import { MissionWorker } from './mission.worker';
import { MissionProcessorService } from './mission.processor';

function parseRedisConfig() {
  const url = process.env.REDIS_URL;

  if (url) {
    return {
      url,
      tls: url.startsWith('rediss://')
        ? { rejectUnauthorized: false }
        : undefined,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      keepAlive: 10000,
      retryStrategy(times: number) {
        return Math.min(times * 50, 2000);
      },
    };
  }

  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    keepAlive: 10000,
    retryStrategy(times: number) {
      return Math.min(times * 50, 2000);
    },
  };
}

@Module({
  imports: [
    BullModule.forRoot({
      connection: parseRedisConfig(),
    }),
    BullModule.registerQueue({
      name: MISSION_QUEUE,
      defaultJobOptions: QUEUE_CONFIG.defaultJobOptions,
    }),
    PrismaModule,
    RankingModule,
  ],
  controllers: [QueueMonitorController],
  providers: [MissionQueue, MissionWorker, MissionProcessorService],
  exports: [MissionQueue],
})
export class QueueModule {}
