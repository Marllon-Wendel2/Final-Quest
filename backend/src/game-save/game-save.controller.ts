import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GameSaveService } from './game-save.service';
import { ActionQueue } from './action-queue';
import type { AddActionCommandDto } from './dtos/addActionCommand.dto';
import { AddActionCommandPipe } from './dtos/addActionCommand.dto';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
    points: number;
  };
}

@Controller('game-save')
@UseGuards(JwtAuthGuard)
export class GameSaveController {
  constructor(
    private readonly gameSaveService: GameSaveService,
    private readonly actionQueue: ActionQueue,
  ) {}

  @Get('game-state')
  async getGameState(@Req() req: AuthenticatedRequest) {
    return this.gameSaveService.getCanonicalState(req.user.id);
  }

  @Post('game-actions')
  @UsePipes(AddActionCommandPipe)
  async handleGameAction(
    @Req() req: AuthenticatedRequest,
    @Body() body: AddActionCommandDto,
  ) {
    const jobId = await this.actionQueue.addAction(req.user.id, body);

    return {
      accepted: true,
      jobId,
      message: 'Ação enfileirada para processamento',
    };
  }
}
