import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { PlayerMissionService } from './player-mission.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Player Missions')
@ApiCookieAuth('token')
@Controller('player-missions')
@UseGuards(JwtAuthGuard)
export class PlayerMissionsController {
  constructor(private readonly playerMissionService: PlayerMissionService) {}

  @Get('available')
  @ApiOperation({ summary: 'Obter missões disponíveis para o jogador' })
  @ApiResponse({ status: 200, description: 'Lista de missões disponíveis' })
  async getAvailable(@Request() req: { user: { id: string } }) {
    return this.playerMissionService.getAvailableMissions(req.user.id);
  }

  @Post('complete/:missionId')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Completar uma missão' })
  @ApiResponse({ status: 202, description: 'Missão completada com sucesso' })
  @ApiResponse({ status: 404, description: 'Missão não encontrada' })
  async complete(
    @Param('missionId') missionId: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.playerMissionService.completeMission(req.user.id, missionId);
  }

  @Get('my-missions')
  @ApiOperation({ summary: 'Obter histórico de missões do jogador' })
  @ApiResponse({ status: 200, description: 'Histórico de missões' })
  async getMyMissions(@Request() req: { user: { id: string } }) {
    return this.playerMissionService.getPlayerHistory(req.user.id);
  }
}
