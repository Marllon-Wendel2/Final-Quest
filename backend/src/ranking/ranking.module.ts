import { Module } from '@nestjs/common';
import { RankingGateway } from './ranking.gateway';

@Module({
  providers: [RankingGateway],
  exports: [RankingGateway],
})
export class RankingModule {}
