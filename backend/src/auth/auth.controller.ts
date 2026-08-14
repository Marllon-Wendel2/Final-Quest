import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import type { RegisterDto } from './dto/register.dto';
import { RegisterPipe } from './dto/register.dto.js';
import type { LoginDto } from './dto/login.dto.js';
import { LoginPipe } from './dto/login.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(RegisterPipe) registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(registerDto);

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('token', result.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, ...user } = result;
    return user;
  }

  @Post('login')
  async login(
    @Body(LoginPipe) loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('token', result.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, ...user } = result;
    return user;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(
    @Request()
    req: {
      user: { id: string; name: string; email: string; points: number };
    },
  ) {
    return req.user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', { path: '/' });
    return { message: 'Logout realizado' };
  }
}
