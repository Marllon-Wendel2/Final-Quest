import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PlayerMissionService } from './player-mission.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('player-missions')
@UseGuards(JwtAuthGuard)
export class PlayerMissionsController {
  constructor(private readonly playerMissionService: PlayerMissionService) {}

  @Post('complete/:missionId')
  async complete(
    @Param('missionId') missionId: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.playerMissionService.completeMission(req.user.id, missionId);
  }

  @Get('my-missions')
  async getMyMissions(@Request() req: { user: { id: string } }) {
    return this.playerMissionService.getPlayerHistory(req.user.id);
  }
}
