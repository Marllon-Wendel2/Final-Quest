import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(id: string) {
    try {
      return this.prismaService.user.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Buscar usuário');
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          points: true,
        },
      });
      if (users.length === 0) {
        throw new NotFoundException('Nenhum usuário encontrado');
      }
      return users;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async updatedUsers(id: string, updatedDto: UpdateUserDto) {
    try {
      return this.prismaService.user.update({
        where: { id },
        data: updatedDto,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async deleteUser(id: string) {
    try {
      return this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
    }
  }
}
