import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { getResetWindow } from 'src/mission/reset-window';
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

    let resetWindow = getResetWindow(mission.frequency);

    // Para ONCE com limite, cada completion usa um resetWindow único
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
      // ONCE sem limite — usa 'once' mas verifica se já existe
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
      // MINUTE, HOUR, DAILY, WEEKLY — verifica janela atual
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

      void this.rankingGateway.broadcastUpdate();
      return result;
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Missão já completada');
      }
      console.error(error);
      throw new Error('Erro ao completar a missão');
    }
  }

  async getAvailableMissions(userId: string) {
    const missions = await this.prismaService.mission.findMany();

    const missionsWithStatus = await Promise.all(
      missions.map(async (mission) => {
        const resetWindow = getResetWindow(mission.frequency);

        let completionsCount = 0;
        let isCompleted = false;
        let completedAt: Date | null = null;

        if (mission.frequency === 'ONCE') {
          if (mission.maxCompletions != null) {
            // ONCE com limite: contar todas as completions
            completionsCount = await this.prismaService.playerMission.count({
              where: {
                userId,
                missionId: mission.id,
                resetWindow: { startsWith: 'once-' },
              },
            });
            isCompleted = completionsCount >= mission.maxCompletions;
          } else {
            // ONCE sem limite: verificar se existe qualquer completion
            const existing = await this.prismaService.playerMission.findFirst({
              where: { userId, missionId: mission.id },
            });
            isCompleted = !!existing;
            completedAt = existing?.completedAt ?? null;
            completionsCount = existing ? 1 : 0;
          }
        } else {
          // MINUTE, HOUR, DAILY, WEEKLY: verificar janela atual
          const completion = await this.prismaService.playerMission.findUnique({
            where: {
              userId_missionId_resetWindow: {
                userId,
                missionId: mission.id,
                resetWindow,
              },
            },
          });
          isCompleted = !!completion;
          completedAt = completion?.completedAt ?? null;
        }

        return {
          ...mission,
          isCompleted,
          completedAt,
          completionsCount,
          resetWindow,
          nextReset: getNextResetInfo(mission.frequency),
        };
      }),
    );

    return missionsWithStatus;
  }

  async getPlayerHistory(userId: string) {
    return this.prismaService.playerMission.findMany({
      where: { userId },
      include: { mission: true },
      orderBy: { completedAt: 'desc' },
    });
  }
}

function getNextResetInfo(frequency: string): { label: string; date: string } {
  const now = new Date();

  switch (frequency) {
    case 'MINUTE': {
      const nextMinute = new Date(now);
      nextMinute.setMinutes(nextMinute.getMinutes() + 1);
      nextMinute.setSeconds(0);
      nextMinute.setMilliseconds(0);
      return {
        label: 'Disponível no próximo minuto',
        date: nextMinute.toISOString(),
      };
    }
    case 'HOUR': {
      const nextHour = new Date(now);
      nextHour.setHours(nextHour.getHours() + 1);
      nextHour.setMinutes(0);
      nextHour.setSeconds(0);
      nextHour.setMilliseconds(0);
      return {
        label: 'Disponível na próxima hora',
        date: nextHour.toISOString(),
      };
    }
    case 'DAILY': {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return {
        label: 'Disponível amanhã',
        date: tomorrow.toISOString().split('T')[0],
      };
    }
    case 'WEEKLY': {
      const nextMonday = new Date(now);
      nextMonday.setDate(
        nextMonday.getDate() + ((1 + 7 - nextMonday.getDay()) % 7 || 7),
      );
      return {
        label: 'Disponível na segunda',
        date: nextMonday.toISOString().split('T')[0],
      };
    }
    case 'ONCE':
      return {
        label: 'Missão única',
        date: 'N/A',
      };
    default:
      return { label: '', date: '' };
  }
}
