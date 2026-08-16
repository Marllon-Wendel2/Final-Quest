import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { MISSION_QUEUE } from './queue.constantes';

export interface MissionJobData {
  userId: string;
  missionId: string;
  requestedAt: string;
  skippedReason?: string;
}

@Injectable()
export class MissionQueue {
  private readonly logger = new Logger(MissionQueue.name);

  constructor(
    @InjectQueue(MISSION_QUEUE)
    private readonly queue: Queue<MissionJobData>,
  ) {}

  async addCompletion(userId: string, missionId: string): Promise<string> {
    const job = await this.queue.add(
      'complete-mission',
      {
        userId,
        missionId,
        requestedAt: new Date().toISOString(),
      },
      {
        jobId: `${userId}-${missionId}-${Date.now()}`,
        priority: 1, // alta prioridade para completions
      },
    );

    this.logger.log(
      `Job enfileirado: ${job.id} | user=${userId} mission=${missionId}`,
    );

    return job.id as string;
  }

  async getJobStatus(jobId: string) {
    const job = await this.queue.getJob(jobId);
    if (!job) return null;

    return {
      id: job.id,
      data: job.data,
      progress: job.progress,
      attemptsMade: job.attemptsMade,
      failedReason: job.failedReason,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn,
      timestamp: job.timestamp,
    };
  }

  async getQueueStats() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.queue.getWaitingCount(),
      this.queue.getActiveCount(),
      this.queue.getCompletedCount(),
      this.queue.getFailedCount(),
      this.queue.getDelayedCount(),
    ]);

    return { waiting, active, completed, failed, delayed };
  }
}
