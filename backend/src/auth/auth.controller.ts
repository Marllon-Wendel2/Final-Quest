import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { RegisterDto } from './dto/register.dto';
import { RegisterPipe } from './dto/register.dto.js';
import type { LoginDto } from './dto/login.dto.js';
import { LoginPipe } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(RegisterPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body(LoginPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
