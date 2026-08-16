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
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserPipe, type UpdateUserDto } from './dtos/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Users')
@ApiCookieAuth('token')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Listar todos os usuários (Admin)' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('ranked')
  @ApiOperation({ summary: 'Obter usuários ranqueados' })
  @ApiQuery({ name: 'limit', required: false, enum: [10, 20, 50], description: 'Limite de resultados' })
  @ApiResponse({ status: 200, description: 'Lista de usuários ranqueados' })
  getRankedUsers(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const validLimit = [10, 20, 50].includes(parsedLimit) ? parsedLimit : 10;
    return this.userService.getRankedUsers(validLimit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter usuário por ID' })
  @ApiResponse({ status: 200, description: 'Dados do usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
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
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
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
