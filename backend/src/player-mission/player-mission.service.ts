import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerMissionService {
  constructor(private readonly prismaService: PrismaService) {}

  async completeMission(userId: string, missionId: string) {
    const mission = await this.prismaService.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission) {
      throw new NotFoundException('Missão não encontrada');
    }

    try {
      return await this.prismaService.$transaction(async (tx) => {
        const playerMission = await tx.playerMission.create({
          data: { userId, missionId },
        });

        await tx.user.update({
          where: { id: userId },
          data: {
            points: { increment: mission.points },
          },
        });

        return playerMission;
      });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao completar a missão');
    }
  }

  async getPlayerHistory(userId: string) {
    return this.prismaService.playerMission.findMany({
      where: { userId },
      include: { mission: true },
      orderBy: { completedAt: 'desc' },
    });
  }
}
