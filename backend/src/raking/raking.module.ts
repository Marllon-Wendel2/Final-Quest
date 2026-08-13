import { Module } from '@nestjs/common';
import { RankingGateway } from './raking.gateway';

@Module({
  providers: [RankingGateway],
  exports: [RankingGateway],
})
export class RankingModule {}
