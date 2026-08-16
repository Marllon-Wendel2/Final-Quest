import { Module } from '@nestjs/common';
import { PlayerMissionService } from './player-mission.service';
import { PlayerMissionsController } from './player-mission.controller';
import { RankingModule } from 'src/ranking/ranking.module';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [RankingModule, QueueModule],
  controllers: [PlayerMissionsController],
  providers: [PlayerMissionService],
})
export class PlayerMissionModule {}
