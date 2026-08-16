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
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url) {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: parseInt(parsed.port || '6379', 10),
      password: token || parsed.password || undefined,
      tls: parsed.protocol === 'rediss:' ? {} : undefined,
    };
  }
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
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
