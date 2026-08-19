import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MissionModule } from './mission/mission.module';
import { PlayerMissionModule } from './player-mission/player-mission.module';
import { RankingModule } from './ranking/ranking.module';
import { QueueModule } from './queue/queue.module';
import { RedisModule } from './redis/redis.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    MissionModule,
    PlayerMissionModule,
    RankingModule,
    QueueModule,
    RedisModule.forRoot(),
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
