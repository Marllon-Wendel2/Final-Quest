import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(registerDto.password, salt);

      const user = await this.prismaService.user.create({
        data: {
          email: registerDto.email,
          name: registerDto.name,
          hashPassword,
        },
      });

      const token = this.generateToken(user);

      return {
        accessToken: token,
        id: user.id,
        name: user.name,
        email: user.email,
        points: user.points,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.hashPassword,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.generateToken(user);

    return {
      accessToken: token,
      id: user.id,
      name: user.name,
      email: user.email,
      points: user.points,
    };
  }

  private generateToken(user: { id: string; email: string }) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
