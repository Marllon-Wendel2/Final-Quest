import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GameActionType } from './dtos/addActionCommand.dto';

@Injectable()
export class EventStoreService {
  constructor(private readonly prisma: PrismaService) {}

  async save(
    userId: string,
    eventType: GameActionType,
    payload: Record<string, unknown>,
    version: number,
  ): Promise<void> {
    await this.prisma.gameEvent.create({
      data: { userId, eventType, payload: payload as any, version },
    });
  }

  async getHistory(userId: string, limit: number = 100): Promise<any[]> {
    return this.prisma.gameEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
