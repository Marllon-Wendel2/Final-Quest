import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { getResetWindow } from 'src/mission/reset-window';
import { PrismaService } from 'src/prisma/prisma.service';
import { RankingGateway } from 'src/ranking/ranking.gateway';

@Injectable()
export class MissionProcessorService {
  private readonly logger = new Logger(MissionProcessorService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly rankingGateway: RankingGateway,
  ) {}

  async processCompletion(userId: string, missionId: string) {
    const mission = await this.prismaService.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission) {
      throw new NotFoundException('Missão não encontrada');
    }

    let resetWindow = getResetWindow(mission.frequency);

    // ONCE com limite: janela única por completion
    if (mission.frequency === 'ONCE' && mission.maxCompletions != null) {
      const totalCompletions = await this.prismaService.playerMission.count({
        where: { userId, missionId, resetWindow: { startsWith: 'once-' } },
      });

      if (totalCompletions >= mission.maxCompletions) {
        throw new ConflictException(
          `Missão já completada ${mission.maxCompletions} vezes (limite atingido)`,
        );
      }

      resetWindow = `once-${totalCompletions + 1}`;
    } else if (mission.frequency === 'ONCE') {
      const existingCompletion =
        await this.prismaService.playerMission.findUnique({
          where: {
            userId_missionId_resetWindow: { userId, missionId, resetWindow },
          },
        });

      if (existingCompletion) {
        throw new ConflictException('Missão já completada');
      }
    } else {
      const existingCompletion =
        await this.prismaService.playerMission.findUnique({
          where: {
            userId_missionId_resetWindow: { userId, missionId, resetWindow },
          },
        });

      if (existingCompletion) {
        const message =
          mission.frequency === 'MINUTE'
            ? 'Missão já completada neste minuto'
            : mission.frequency === 'HOUR'
              ? 'Missão já completada nesta hora'
              : mission.frequency === 'DAILY'
                ? 'Missão já completada hoje'
                : 'Missão já completada esta semana';
        throw new ConflictException(message);
      }
    }

    // Transação atômica — aqui o @@unique é a última defesa
    try {
      const result = await this.prismaService.$transaction(async (tx) => {
        const playerMission = await tx.playerMission.create({
          data: {
            userId,
            missionId,
            resetWindow,
          },
        });

        await tx.user.update({
          where: { id: userId },
          data: {
            points: { increment: mission.points },
          },
        });

        return playerMission;
      });

      // Broadcast WebSocket para atualizar ranking em tempo real
      this.rankingGateway.broadcastUpdate();

      this.logger.log(
        `Missão completada via fila: user=${userId} mission=${missionId} points=${mission.points}`,
      );

      return result;
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Missão já completada');
      }
      throw error;
    }
  }
}
