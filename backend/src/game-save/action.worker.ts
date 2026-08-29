import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ActionProcessor } from './action.processor';
import { GameActionJobData } from './action-queue';
import { GAME_ACTION_QUEUE } from './game-save.constants';

@Processor(GAME_ACTION_QUEUE)
export class ActionWorker extends WorkerHost {
  private readonly logger = new Logger(ActionWorker.name);

  constructor(private readonly processor: ActionProcessor) {
    super();
  }

  async process(job: Job<GameActionJobData>) {
    this.logger.log(
      `Processando ação ${job.id}: user=${job.data.userId} type=${job.data.command.type}`,
    );
    try {
      const result = await this.processor.process(
        job.data.userId,
        job.data.command,
      );
      await job.updateProgress(100);
      return result;
    } catch (error) {
      this.logger.error(`Ação ${job.id} falhou: ${error}!`);
      throw error;
    }
  }
}
