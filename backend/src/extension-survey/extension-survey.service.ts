import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  PostCourseSurveyDto,
  PreCourseSurveyDto,
} from './dto/extension-survey.dto';

const DEFAULT_COURSE_ID = 'logicaGuanabara';
const REQUIRED_LOGICA_LESSONS = 15;

@Injectable()
export class ExtensionSurveyService {
  private readonly logger = new Logger(ExtensionSurveyService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getMySurvey(userId: string, courseId = DEFAULT_COURSE_ID) {
    const survey = await this.prisma.extensionSurvey.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    return {
      courseId,
      preCompleted: Boolean(survey?.preSubmittedAt),
      postCompleted: Boolean(survey?.postSubmittedAt),
      survey,
    };
  }

  async submitPreSurvey(userId: string, dto: PreCourseSurveyDto) {
    const courseId = dto.courseId || DEFAULT_COURSE_ID;
    const now = new Date();

    const survey = await this.prisma.extensionSurvey.upsert({
      where: {
        userId_courseId: { userId, courseId },
      },
      create: {
        userId,
        courseId,
        preSubmittedAt: now,
        ageRange: dto.ageRange,
        profileType: dto.profileType,
        educationLevel: dto.educationLevel,
        cityState: dto.cityState,
        priorProgramming: dto.priorProgramming,
        preConfidence: dto.preConfidence,
        expectation: dto.expectation || null,
        consentAccepted: dto.consentAccepted,
      },
      update: {
        preSubmittedAt: now,
        ageRange: dto.ageRange,
        profileType: dto.profileType,
        educationLevel: dto.educationLevel,
        cityState: dto.cityState,
        priorProgramming: dto.priorProgramming,
        preConfidence: dto.preConfidence,
        expectation: dto.expectation || null,
        consentAccepted: dto.consentAccepted,
      },
    });

    this.logger.log(
      `Formulário pré-curso salvo: user=${userId} course=${courseId}`,
    );

    return {
      courseId,
      preCompleted: true,
      postCompleted: Boolean(survey.postSubmittedAt),
      survey,
    };
  }

  async submitPostSurvey(userId: string, dto: PostCourseSurveyDto) {
    const courseId = dto.courseId || DEFAULT_COURSE_ID;

    if (courseId === DEFAULT_COURSE_ID) {
      const completedCount = await this.countCompletedLogicaLessons(userId);
      if (completedCount < REQUIRED_LOGICA_LESSONS) {
        throw new BadRequestException(
          `Conclua todas as ${REQUIRED_LOGICA_LESSONS} aulas antes de responder à avaliação final (atual: ${completedCount}/${REQUIRED_LOGICA_LESSONS}).`,
        );
      }
    }

    const now = new Date();

    const survey = await this.prisma.extensionSurvey.upsert({
      where: {
        userId_courseId: { userId, courseId },
      },
      create: {
        userId,
        courseId,
        postSubmittedAt: now,
        postConfidence: dto.postConfidence,
        gamificationRating: dto.gamificationRating,
        overallRating: dto.overallRating,
        difficulties: dto.difficulties || null,
        highlights: dto.highlights || null,
        suggestions: dto.suggestions || null,
      },
      update: {
        postSubmittedAt: now,
        postConfidence: dto.postConfidence,
        gamificationRating: dto.gamificationRating,
        overallRating: dto.overallRating,
        difficulties: dto.difficulties || null,
        highlights: dto.highlights || null,
        suggestions: dto.suggestions || null,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { certificados: true },
    });

    const currentCerts = user?.certificados ?? [];
    let updatedCerts = currentCerts;

    if (!currentCerts.includes(courseId)) {
      updatedCerts = [...currentCerts, courseId];
      await this.prisma.user.update({
        where: { id: userId },
        data: { certificados: updatedCerts },
      });
      this.logger.log(
        `Certificado "${courseId}" liberado após pós-curso para user=${userId}`,
      );
    }

    return {
      courseId,
      preCompleted: Boolean(survey.preSubmittedAt),
      postCompleted: true,
      certificateGranted: true,
      certificados: updatedCerts,
      survey,
    };
  }

  async getExtensionReport(courseId = DEFAULT_COURSE_ID) {
    const surveys = await this.prisma.extensionSurvey.findMany({
      where: {
        courseId,
        user: { role: 'USER' },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            points: true,
            certificados: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const videoMissions = await this.prisma.mission.findMany({
      where: {
        challengeType: 'VIDEO_LESSON' as any,
        title: { startsWith: 'Aula ' },
      },
      select: { id: true },
    });
    const videoMissionIds = videoMissions.map((m) => m.id);
    const totalAvailableLessons = videoMissionIds.length || REQUIRED_LOGICA_LESSONS;

    const completionsByUser = new Map<string, Set<string>>();
    if (videoMissionIds.length > 0 && surveys.length > 0) {
      const playerMissions = await this.prisma.playerMission.findMany({
        where: {
          userId: { in: surveys.map((s) => s.userId) },
          missionId: { in: videoMissionIds },
        },
        select: { userId: true, missionId: true },
      });

      for (const pm of playerMissions) {
        const set = completionsByUser.get(pm.userId) ?? new Set<string>();
        set.add(pm.missionId);
        completionsByUser.set(pm.userId, set);
      }
    }

    const preSurveys = surveys.filter((s) => s.preSubmittedAt !== null);
    const postSurveys = surveys.filter((s) => s.postSubmittedAt !== null);
    const certifiedSurveys = surveys.filter((s) =>
      s.user.certificados.includes(courseId),
    );

    const avg = (values: Array<number | null>): number | null => {
      const valid = values.filter((v): v is number => typeof v === 'number');
      if (valid.length === 0) return null;
      const sum = valid.reduce((acc, v) => acc + v, 0);
      return Number((sum / valid.length).toFixed(2));
    };

    const avgPreConfidence = avg(preSurveys.map((s) => s.preConfidence));
    const avgPostConfidence = avg(postSurveys.map((s) => s.postConfidence));
    const confidenceGain =
      avgPreConfidence !== null && avgPostConfidence !== null
        ? Number((avgPostConfidence - avgPreConfidence).toFixed(2))
        : null;
    const confidenceGainPercent =
      avgPreConfidence && avgPreConfidence > 0 && confidenceGain !== null
        ? Number(((confidenceGain / avgPreConfidence) * 100).toFixed(1))
        : null;

    const completedCounts = preSurveys.map(
      (s) => completionsByUser.get(s.userId)?.size ?? 0,
    );
    const avgCompletedLessons = avg(completedCounts);
    const completionRatePercent =
      avgCompletedLessons !== null
        ? Number(((avgCompletedLessons / totalAvailableLessons) * 100).toFixed(1))
        : null;
    const certificationRatePercent =
      preSurveys.length > 0
        ? Number(((certifiedSurveys.length / preSurveys.length) * 100).toFixed(1))
        : null;

    const profileBreakdown: Record<string, number> = {};
    const ageRangeBreakdown: Record<string, number> = {};
    const educationBreakdown: Record<string, number> = {};
    const cityBreakdown: Record<string, number> = {};
    const priorProgrammingBreakdown = { yes: 0, no: 0 };

    for (const s of preSurveys) {
      if (s.profileType) {
        profileBreakdown[s.profileType] =
          (profileBreakdown[s.profileType] ?? 0) + 1;
      }
      if (s.ageRange) {
        ageRangeBreakdown[s.ageRange] =
          (ageRangeBreakdown[s.ageRange] ?? 0) + 1;
      }
      if (s.educationLevel) {
        educationBreakdown[s.educationLevel] =
          (educationBreakdown[s.educationLevel] ?? 0) + 1;
      }
      if (s.cityState) {
        cityBreakdown[s.cityState] = (cityBreakdown[s.cityState] ?? 0) + 1;
      }
      if (s.priorProgramming === true) priorProgrammingBreakdown.yes += 1;
      if (s.priorProgramming === false) priorProgrammingBreakdown.no += 1;
    }

    return {
      courseId,
      generatedAt: new Date().toISOString(),
      summary: {
        totalParticipants: preSurveys.length,
        totalPostCompleted: postSurveys.length,
        totalCertified: certifiedSurveys.length,
        totalAvailableLessons,
        avgCompletedLessons,
        completionRatePercent,
        certificationRatePercent,
        avgPreConfidence,
        avgPostConfidence,
        confidenceGain,
        confidenceGainPercent,
        avgGamificationRating: avg(
          postSurveys.map((s) => s.gamificationRating),
        ),
        avgOverallRating: avg(postSurveys.map((s) => s.overallRating)),
        profileBreakdown,
        ageRangeBreakdown,
        educationBreakdown,
        cityBreakdown,
        priorProgrammingBreakdown,
      },
      responses: surveys.map((s) => ({
        userId: s.userId,
        name: s.user.name,
        email: s.user.email,
        points: s.user.points,
        hasCertificate: s.user.certificados.includes(courseId),
        completedLessonsCount: completionsByUser.get(s.userId)?.size ?? 0,
        ageRange: s.ageRange,
        profileType: s.profileType,
        educationLevel: s.educationLevel,
        cityState: s.cityState,
        priorProgramming: s.priorProgramming,
        preConfidence: s.preConfidence,
        expectation: s.expectation,
        preSubmittedAt: s.preSubmittedAt,
        postConfidence: s.postConfidence,
        gamificationRating: s.gamificationRating,
        overallRating: s.overallRating,
        difficulties: s.difficulties,
        highlights: s.highlights,
        suggestions: s.suggestions,
        postSubmittedAt: s.postSubmittedAt,
      })),
    };
  }

  private async countCompletedLogicaLessons(userId: string): Promise<number> {
    const videoMissions = await this.prisma.mission.findMany({
      where: {
        challengeType: 'VIDEO_LESSON' as any,
        title: { startsWith: 'Aula ' },
      },
      select: { id: true },
    });

    if (videoMissions.length === 0) return 0;

    const completed = await this.prisma.playerMission.findMany({
      where: {
        userId,
        missionId: { in: videoMissions.map((m) => m.id) },
      },
      select: { missionId: true },
    });

    return new Set(completed.map((c) => c.missionId)).size;
  }
}
