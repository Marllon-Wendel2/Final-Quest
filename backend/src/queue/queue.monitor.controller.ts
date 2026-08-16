import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MissionQueue } from './mission.queue';

@ApiTags('Queue')
@Controller('queue')
export class QueueMonitorController {
  constructor(private readonly missionQueue: MissionQueue) {}

  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas da fila' })
  @ApiResponse({ status: 200, description: 'Estatísticas da fila de missões' })
  getStats() {
    return this.missionQueue.getQueueStats();
  }

  @Get('job/:jobId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter status de um job específico' })
  @ApiResponse({ status: 200, description: 'Status do job' })
  @ApiResponse({ status: 404, description: 'Job não encontrado' })
  async getJobStatus(@Param('jobId') jobId: string) {
    const status = await this.missionQueue.getJobStatus(jobId);
    if (!status) {
      return { error: 'Job não encontrado' };
    }
    return status;
  }
}
