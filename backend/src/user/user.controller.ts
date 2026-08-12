import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserPipe, type UpdateUserDto } from './dtos/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('ranked')
  getRankedUsers(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const validLimit = [10, 20, 50].includes(parsedLimit) ? parsedLimit : 10;
    return this.userService.getRankedUsers(validLimit);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updatedUsers(
    @Param('id') id: string,
    @Body(UpdateUserPipe) updatedDto: UpdateUserDto,
    @Req() req: Request & { user: { id: string; role: string } },
  ) {
    if (req.user.role !== 'ADMIN' && req.user.id !== id) {
      throw new ForbiddenException('Você só pode atualizar seu próprio perfil');
    }
    return this.userService.updatedUsers(id, updatedDto);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Req() req: Request & { user: { id: string; role: string } },
  ) {
    if (req.user.role !== 'ADMIN' && req.user.id !== id) {
      throw new ForbiddenException('Você só pode deletar seu próprio perfil');
    }
    return this.userService.deleteUser(id);
  }
}
