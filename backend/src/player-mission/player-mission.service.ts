import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RankingGateway } from 'src/raking/raking.gateway';

@Injectable()
export class PlayerMissionService {
  constructor(
    private readonly rankingGateway: RankingGateway,
    private readonly prismaService: PrismaService,
  ) {}

  async completeMission(userId: string, missionId: string) {
    const mission = await this.prismaService.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission) {
      throw new NotFoundException('Missão não encontrada');
    }

    const existingCompletion =
      await this.prismaService.playerMission.findUnique({
        where: {
          userId_missionId: { userId, missionId },
        },
      });

    if (existingCompletion) {
      throw new ConflictException('Missão já completada');
    }

    try {
      const result = await this.prismaService.$transaction(async (tx) => {
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

      this.rankingGateway.broadcastUpdate();
      return result;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Missão já completada');
      }
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
