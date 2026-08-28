import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { AuthModule } from '../auth/auth.module';
import { GameService } from './game.service';
import { BotService } from './bot.service';
import { GameGateway } from './game.gateway';
import { MemoryGameService } from './memory-game.service';

@Module({
  imports: [RedisModule.forRoot(), AuthModule],
  providers: [GameService, BotService, GameGateway, MemoryGameService],
  exports: [GameService, MemoryGameService],
})
export class GameModule {}
