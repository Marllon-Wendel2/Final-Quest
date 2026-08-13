import { Module } from '@nestjs/common';
import { PlayerMissionService } from './player-mission.service';
import { PlayerMissionsController } from './player-mission.controller';
import { RankingModule } from 'src/raking/raking.module';

@Module({
  imports: [RankingModule],
  controllers: [PlayerMissionsController],
  providers: [PlayerMissionService],
})
export class PlayerMissionModule {}
