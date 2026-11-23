import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getResetWindow } from '../mission/reset-window';
import { MissionQueue } from '../queue/mission.queue';
import { PrismaService } from '../prisma/prisma.service';
import { RankingGateway } from '../ranking/ranking.gateway';
import { UpdateVideoLessonProgressDto } from './dto/video-lesson-progress.dto';

export interface VideoLessonProgressData {
  answeredQuestions: string[];
  xpGranted: string[];
  bonusGranted: boolean;
  videoCompleted: boolean;
  missionCompleted: boolean;
}

const DEFAULT_VIDEO_LESSON_PROGRESS: VideoLessonProgressData = {
  answeredQuestions: [],
  xpGranted: [],
  bonusGranted: false,
  videoCompleted: false,
  missionCompleted: false,
};

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

    if (!mission.isActive) {
      throw new BadRequestException('Missão desabilitada');
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
    const missions = await this.prismaService.mission.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    });

    const lessonProgressByMission = new Map<string, VideoLessonProgressData>();
    try {
      const savedProgress =
        (await this.prismaService.videoLessonProgress?.findMany({
          where: { userId },
        })) ?? [];
      for (const p of savedProgress) {
        lessonProgressByMission.set(p.missionId, {
          answeredQuestions: p.answeredQuestions,
          xpGranted: p.xpGranted,
          bonusGranted: p.bonusGranted,
          videoCompleted: p.videoCompleted,
          missionCompleted: p.missionCompleted,
        });
      }
    } catch {
      // ignore if migration hasn't run yet
    }

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
            if (completionsCount > 0) {
              const latest = await this.prismaService.playerMission.findFirst({
                where: {
                  userId,
                  missionId: mission.id,
                  resetWindow: { startsWith: 'once-' },
                },
                orderBy: { completedAt: 'desc' },
                select: { completedAt: true },
              });
              completedAt = latest?.completedAt ?? null;
            }
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

        const storedLessonProgress = lessonProgressByMission.get(mission.id);
        const lessonProgress: VideoLessonProgressData | undefined =
          (mission.challengeType as string) === 'VIDEO_LESSON'
            ? {
                ...(storedLessonProgress ?? DEFAULT_VIDEO_LESSON_PROGRESS),
                missionCompleted: Boolean(
                  storedLessonProgress?.missionCompleted || isCompleted,
                ),
              }
            : undefined;

        return {
          ...mission,
          isCompleted,
          completedAt,
          completionsCount,
          resetWindow,
          nextReset: getNextResetInfo(mission.frequency),
          ...(lessonProgress ? { lessonProgress } : {}),
        };
      }),
    );

    const completedLessonMissions = missionsWithStatus.filter(
      (m) =>
        (m.challengeType as string) === 'VIDEO_LESSON' &&
        m.title.startsWith('Aula ') &&
        m.isCompleted,
    );

    if (completedLessonMissions.length >= 15) {
      await this.ensureCertificateIfSurveyCompleted(userId, 'logicaGuanabara');
    }

    return missionsWithStatus;
  }

  async getVideoLessonProgress(
    userId: string,
    missionId: string,
  ): Promise<VideoLessonProgressData> {
    const mission = await this.prismaService.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission) {
      throw new NotFoundException('Missão não encontrada');
    }

    if ((mission.challengeType as string) !== 'VIDEO_LESSON') {
      throw new BadRequestException('Missão não é uma videoaula');
    }

    const [saved, existingCompletion] = await Promise.all([
      this.prismaService.videoLessonProgress.findUnique({
        where: { userId_missionId: { userId, missionId } },
      }),
      this.prismaService.playerMission.findFirst({
        where: { userId, missionId },
        select: { id: true },
      }),
    ]);

    return {
      answeredQuestions: saved?.answeredQuestions ?? [],
      xpGranted: saved?.xpGranted ?? [],
      bonusGranted: saved?.bonusGranted ?? false,
      videoCompleted: saved?.videoCompleted ?? false,
      missionCompleted: Boolean(
        saved?.missionCompleted || existingCompletion,
      ),
    };
  }

  async saveVideoLessonProgress(
    userId: string,
    missionId: string,
    dto: UpdateVideoLessonProgressDto,
  ): Promise<VideoLessonProgressData> {
    const mission = await this.prismaService.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission) {
      throw new NotFoundException('Missão não encontrada');
    }

    if (!mission.isActive) {
      throw new BadRequestException('Missão desabilitada');
    }

    if ((mission.challengeType as string) !== 'VIDEO_LESSON') {
      throw new BadRequestException('Missão não é uma videoaula');
    }

    const existing = await this.prismaService.videoLessonProgress.findUnique({
      where: { userId_missionId: { userId, missionId } },
    });

    const answeredQuestions = Array.from(
      new Set([
        ...(existing?.answeredQuestions ?? []),
        ...(dto.answeredQuestions ?? []),
      ]),
    );
    const xpGranted = Array.from(
      new Set([...(existing?.xpGranted ?? []), ...(dto.xpGranted ?? [])]),
    );
    const bonusGranted = Boolean(existing?.bonusGranted || dto.bonusGranted);
    const videoCompleted = Boolean(
      existing?.videoCompleted || dto.videoCompleted,
    );
    const missionCompleted = Boolean(
      existing?.missionCompleted || dto.missionCompleted,
    );

    const saved = await this.prismaService.videoLessonProgress.upsert({
      where: { userId_missionId: { userId, missionId } },
      create: {
        userId,
        missionId,
        answeredQuestions,
        xpGranted,
        bonusGranted,
        videoCompleted,
        missionCompleted,
      },
      update: {
        answeredQuestions,
        xpGranted,
        bonusGranted,
        videoCompleted,
        missionCompleted,
      },
    });

    return {
      answeredQuestions: saved.answeredQuestions,
      xpGranted: saved.xpGranted,
      bonusGranted: saved.bonusGranted,
      videoCompleted: saved.videoCompleted,
      missionCompleted: saved.missionCompleted,
    };
  }

  private async ensureCertificateIfSurveyCompleted(
    userId: string,
    certificateId: string,
  ): Promise<void> {
    try {
      const survey = await this.prismaService.extensionSurvey.findUnique({
        where: {
          userId_courseId: { userId, courseId: certificateId },
        },
        select: { postSubmittedAt: true },
      });
      if (!survey?.postSubmittedAt) return;

      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });
      if (!user) return;

      const currentCerts =
        (user as { certificados?: string[] }).certificados ?? [];
      if (currentCerts.includes(certificateId)) return;

      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          certificados: [...currentCerts, certificateId],
        } as any,
      });
    } catch {
      // ignore if migration hasn't run yet
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
