import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { GAME_ACTION_QUEUE } from './game-save.constants';
import { AddActionCommandDto } from './dtos/addActionCommand.dto';
import { EventType } from '@prisma/client';

export interface GameActionJobData {
  userId: string;
  command: { type: EventType; payload: Record<string, unknown> };
  requestedAt: string;
}

@Injectable()
export class ActionQueue {
  private readonly logger = new Logger(ActionQueue.name);

  constructor(
    @InjectQueue(GAME_ACTION_QUEUE)
    private readonly queue: Queue<GameActionJobData>,
  ) {}

  async addAction(
    userId: string,
    command: AddActionCommandDto,
  ): Promise<string> {
    const job = await this.queue.add(
      'process-action',
      {
        userId,
        command,
        requestedAt: new Date().toISOString(),
      },
      {
        jobId: `${userId}-${command.type}-${Date.now()}`,
        priority: 2,
      },
    );

    this.logger.log(
      `Ação enfileirada: ${job.id} | user=${userId} type=${command.type}`,
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
