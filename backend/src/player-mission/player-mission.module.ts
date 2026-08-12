import { Module } from '@nestjs/common';
import { PlayerMissionService } from './player-mission.service';
import { PlayerMissionsController } from './player-mission.controller';

@Module({
  controllers: [PlayerMissionsController],
  providers: [PlayerMissionService],
})
export class PlayerMissionModule {}
