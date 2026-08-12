import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { MissionSeedService } from './mission-seed.service';

@Module({
  controllers: [MissionController],
  providers: [MissionService, MissionSeedService],
})
export class MissionModule {}
