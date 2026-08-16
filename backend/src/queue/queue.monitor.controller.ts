import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { MissionQueue } from './mission.queue';

@Controller('queue')
export class QueueMonitorController {
  constructor(private readonly missionQueue: MissionQueue) {}

  @Get('stats')
  getStats() {
    return this.missionQueue.getQueueStats();
  }

  @Get('job/:jobId')
  @HttpCode(HttpStatus.OK)
  async getJobStatus(@Param('jobId') jobId: string) {
    const status = await this.missionQueue.getJobStatus(jobId);
    if (!status) {
      return { error: 'Job não encontrado' };
    }
    return status;
  }
}
