import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { getResetWindow } from '../mission/reset-window';
import { PrismaService } from '../prisma/prisma.service';
import { RankingGateway } from '../ranking/ranking.gateway';

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

    if (!mission.isActive) {
      throw new BadRequestException('Missão desabilitada');
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

      if ((mission.challengeType as string) === 'VIDEO_LESSON') {
        await this.ensureLogicaCertificateIfComplete(userId);
      }

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

  private async ensureLogicaCertificateIfComplete(
    userId: string,
  ): Promise<void> {
    try {
      const videoMissions = await this.prismaService.mission.findMany({
        where: {
          challengeType: 'VIDEO_LESSON' as any,
          title: { startsWith: 'Aula ' },
        },
        select: { id: true },
      });

      if (videoMissions.length < 15) return;

      const missionIds = videoMissions.map((m) => m.id);
      const completed = await this.prismaService.playerMission.findMany({
        where: {
          userId,
          missionId: { in: missionIds },
        },
        select: { missionId: true },
      });

      const uniqueCompleted = new Set(completed.map((c) => c.missionId));
      if (uniqueCompleted.size < 15) return;

      // Certificado só é liberado após o aluno responder ao formulário pós-curso
      const survey = await this.prismaService.extensionSurvey.findUnique({
        where: {
          userId_courseId: { userId, courseId: 'logicaGuanabara' },
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
      if (currentCerts.includes('logicaGuanabara')) return;

      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          certificados: [...currentCerts, 'logicaGuanabara'],
        } as any,
      });

      this.logger.log(
        `Certificado "logicaGuanabara" concedido ao usuário ${userId}`,
      );
    } catch (err) {
      this.logger.warn(
        `Falha ao verificar certificado logicaGuanabara para user=${userId}: ${String(err)}`,
      );
    }
  }
}
