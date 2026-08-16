import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getResetWindow } from 'src/mission/reset-window';
import { MissionQueue } from 'src/queue/mission.queue';
import { PrismaService } from 'src/prisma/prisma.service';
import { RankingGateway } from 'src/ranking/ranking.gateway';

@Injectable()
export class PlayerMissionService {
  constructor(
    private readonly rankingGateway: RankingGateway,
    private readonly prismaService: PrismaService,
    private readonly missionQueue: MissionQueue,
  ) {}

  async completeMission(userId: string, missionId: string) {
    const mission = await this.prismaService.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission) {
      throw new NotFoundException('Missão não encontrada');
    }

    // Validação rápida de negócio (fail fast antes de enfileirar)
    if (mission.frequency === 'ONCE' && mission.maxCompletions != null) {
      const totalCompletions = await this.prismaService.playerMission.count({
        where: { userId, missionId, resetWindow: { startsWith: 'once-' } },
      });
      if (totalCompletions >= mission.maxCompletions) {
        throw new ConflictException(
          `Missão já completada ${mission.maxCompletions} vezes`,
        );
      }
    }

    // Enfileira o job (não bloqueia o request)
    const jobId = await this.missionQueue.addCompletion(userId, missionId);

    // Retorna 202 Accepted — o processamento é assíncrono
    return {
      status: 'queued',
      jobId,
      message: 'Missão em processamento',
    };
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
