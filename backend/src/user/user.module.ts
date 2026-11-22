import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdminSeedService } from './admin-seed.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AdminSeedService],
})
export class UserModule {}
