import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { MissionProcessorService } from './mission.processor';
import { MissionJobData } from './mission.queue';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { MISSION_QUEUE } from './queue.constantes';

@Processor(MISSION_QUEUE)
export class MissionWorker extends WorkerHost {
  private readonly logger = new Logger(MissionWorker.name);

  constructor(private readonly processor: MissionProcessorService) {
    super();
  }

  async process(job: Job<MissionJobData>) {
    this.logger.log(
      `Processando job ${job.id}: user=${job.data.userId} mission=${job.data.missionId}`,
    );

    try {
      const result = await this.processor.processCompletion(
        job.data.userId,
        job.data.missionId,
      );

      await job.updateProgress(100);
      this.logger.log(`Job ${job.id} concluído com sucesso`);

      return result;
    } catch (error) {
      // NotFoundException e ConflictException NÃO devem ser retryed
      // São erros de negócio, não de infraestrutura
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        this.logger.warn(`Job ${job.id} falhou (sem retry): ${error.message}`);
        // Marca como "completed" para não retry, mas registra o motivo
        await job.updateData({
          ...job.data,
          skippedReason: error.message,
        });
        return { skipped: true, reason: error.message };
      }

      // Outros erros (DB down, timeout) → retry com backoff
      this.logger.error(
        `Job ${job.id} falhou (retry ${job.attemptsMade + 1}/${job.opts.attempts}): ${error}`,
      );
      throw error; // BullMQ retry automático
    }
  }
}
