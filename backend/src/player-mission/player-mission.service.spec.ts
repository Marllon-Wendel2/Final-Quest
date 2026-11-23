import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMissionService } from './player-mission.service';
import { createPrismaMock, PrismaMock } from '../test/prisma.mock';
import { createRankingGatewayMock } from '../test/ranking-gateway.mock';
import { makeMission } from '../test/fixtures';
import { PrismaService } from '../prisma/prisma.service';
import { RankingGateway } from '../ranking/ranking.gateway';
import { MissionQueue } from '../queue/mission.queue';

describe('PlayerMissionService', () => {
  let service: PlayerMissionService;
  let prisma: PrismaMock;
  let rankingGateway: ReturnType<typeof createRankingGatewayMock>;
  let missionQueue: { addCompletion: jest.Mock };

  beforeEach(async () => {
    prisma = createPrismaMock();
    rankingGateway = createRankingGatewayMock();
    missionQueue = { addCompletion: jest.fn().mockResolvedValue('job-123') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerMissionService,
        { provide: PrismaService, useValue: prisma },
        { provide: RankingGateway, useValue: rankingGateway },
        { provide: MissionQueue, useValue: missionQueue },
      ],
    }).compile();

    service = module.get<PlayerMissionService>(PlayerMissionService);
  });

  describe('completeMission', () => {
    it('deve enfileirar missão com sucesso', async () => {
      const mission = makeMission({ points: 50 });
      const userId = 'user-id-001';

      prisma.mission.findUnique.mockResolvedValue(mission);
      prisma.playerMission.count.mockResolvedValue(0);

      const result = await service.completeMission(userId, mission.id);

      expect(missionQueue.addCompletion).toHaveBeenCalledWith(
        userId,
        mission.id,
      );
      expect(result).toEqual({
        status: 'queued',
        jobId: 'job-123',
        message: 'Missão em processamento',
      });
    });

    it('deve lançar NotFoundException se missão não existir', async () => {
      prisma.mission.findUnique.mockResolvedValue(null);

      await expect(
        service.completeMission('user-id', 'nonexistent-id'),
      ).rejects.toThrow(NotFoundException);
    });

    it('deve lançar BadRequestException se missão estiver desabilitada', async () => {
      const mission = makeMission({ isActive: false });
      prisma.mission.findUnique.mockResolvedValue(mission);

      await expect(
        service.completeMission('user-id', mission.id),
      ).rejects.toThrow(BadRequestException);
      expect(missionQueue.addCompletion).not.toHaveBeenCalled();
    });

    it('deve lançar ConflictException se missão ONCE já completada (limite atingido)', async () => {
      const mission = makeMission({ frequency: 'ONCE', maxCompletions: 1 });

      prisma.mission.findUnique.mockResolvedValue(mission);
      prisma.playerMission.count.mockResolvedValue(1);

      await expect(
        service.completeMission('user-id', mission.id),
      ).rejects.toThrow(ConflictException);
    });

    it('deve retornar queued para missão ONCE sem limite', async () => {
      const mission = makeMission({ frequency: 'ONCE' });

      prisma.mission.findUnique.mockResolvedValue(mission);

      const result = await service.completeMission('user-id', mission.id);

      expect(result).toEqual({
        status: 'queued',
        jobId: 'job-123',
        message: 'Missão em processamento',
      });
      expect(missionQueue.addCompletion).toHaveBeenCalled();
    });

    it('deve retornar queued para missão recorrente disponível', async () => {
      const mission = makeMission({ frequency: 'DAILY' });

      prisma.mission.findUnique.mockResolvedValue(mission);
      prisma.playerMission.findUnique.mockResolvedValue(null);

      const result = await service.completeMission('user-id', mission.id);

      expect(result).toEqual({
        status: 'queued',
        jobId: 'job-123',
        message: 'Missão em processamento',
      });
      expect(missionQueue.addCompletion).toHaveBeenCalled();
    });
  });

  describe('getAvailableMissions', () => {
    it('deve buscar apenas missões ativas (isActive: true)', async () => {
      const activeMission = makeMission({
        id: 'lesson-1',
        title: 'Aula 1: Introdução à Lógica',
        challengeType: 'VIDEO_LESSON',
        isActive: true,
      });
      prisma.mission.findMany.mockResolvedValue([activeMission]);
      prisma.playerMission.count.mockResolvedValue(0);

      const result = await service.getAvailableMissions('user-id-001');

      expect(prisma.mission.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
        orderBy: { createdAt: 'asc' },
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('lesson-1');
    });
  });

  describe('getPlayerHistory', () => {
    it('deve retornar histórico do usuário com missões incluídas', async () => {
      const userId = 'user-id-001';
      const mission = makeMission();
      const history = [
        {
          ...{
            id: '1',
            userId,
            missionId: 'm1',
            resetWindow: 'once',
            completedAt: new Date(),
          },
          mission,
        },
        {
          ...{
            id: '2',
            userId,
            missionId: 'm2',
            resetWindow: 'once',
            completedAt: new Date(),
          },
          mission,
        },
      ];

      prisma.playerMission.findMany = jest.fn().mockResolvedValue(history);

      const result = await service.getPlayerHistory(userId);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('mission');
    });

    it('deve retornar array vazio quando usuário não tem missões', async () => {
      prisma.playerMission.findMany = jest.fn().mockResolvedValue([]);

      const result = await service.getPlayerHistory('user-without-missions');

      expect(result).toEqual([]);
    });
  });

  describe('videoLessonProgress', () => {
    it('deve retornar progresso salvo mesclado com conclusão do PlayerMission', async () => {
      const mission = makeMission({
        id: 'lesson-1',
        challengeType: 'VIDEO_LESSON',
      });
      prisma.mission.findUnique.mockResolvedValue(mission);
      prisma.videoLessonProgress.findUnique.mockResolvedValue({
        answeredQuestions: ['q1'],
        xpGranted: ['q1'],
        bonusGranted: false,
        videoCompleted: false,
        missionCompleted: false,
      });
      prisma.playerMission.findFirst.mockResolvedValue({ id: 'pm-1' });

      const result = await service.getVideoLessonProgress(
        'user-id-001',
        mission.id,
      );

      expect(result).toEqual({
        answeredQuestions: ['q1'],
        xpGranted: ['q1'],
        bonusGranted: false,
        videoCompleted: false,
        missionCompleted: true,
      });
    });

    it('deve mesclar progresso de videoaula de forma monotônica no upsert', async () => {
      const mission = makeMission({
        id: 'lesson-1',
        challengeType: 'VIDEO_LESSON',
        isActive: true,
      });
      prisma.mission.findUnique.mockResolvedValue(mission);
      prisma.videoLessonProgress.findUnique.mockResolvedValue({
        answeredQuestions: ['q1'],
        xpGranted: ['q1'],
        bonusGranted: false,
        videoCompleted: true,
        missionCompleted: false,
      });
      prisma.videoLessonProgress.upsert.mockImplementation(
        ({ create }: { create: Record<string, unknown> }) =>
          Promise.resolve(create),
      );

      const result = await service.saveVideoLessonProgress(
        'user-id-001',
        mission.id,
        {
          answeredQuestions: ['q1', 'q2'],
          xpGranted: ['q2'],
          bonusGranted: true,
          videoCompleted: false,
          missionCompleted: true,
        },
      );

      expect(result).toEqual({
        answeredQuestions: ['q1', 'q2'],
        xpGranted: ['q1', 'q2'],
        bonusGranted: true,
        videoCompleted: true,
        missionCompleted: true,
      });
    });

    it('deve rejeitar progresso para missão que não é VIDEO_LESSON', async () => {
      const mission = makeMission({
        id: 'other-mission',
        challengeType: 'MEMORY',
        isActive: true,
      });
      prisma.mission.findUnique.mockResolvedValue(mission);

      await expect(
        service.saveVideoLessonProgress('user-id-001', mission.id, {
          videoCompleted: true,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
