import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MissionModule } from './mission/mission.module';
import { PlayerMissionModule } from './player-mission/player-mission.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
