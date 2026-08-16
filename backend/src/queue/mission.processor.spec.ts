/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MissionProcessorService } from './mission.processor';
import { createPrismaMock, PrismaMock } from 'src/test/prisma.mock';
import { createRankingGatewayMock } from 'src/test/ranking-gateway.mock';
import { makeMission, makePlayerMission } from 'src/test/fixtures';
import { PrismaService } from 'src/prisma/prisma.service';
import { RankingGateway } from 'src/ranking/ranking.gateway';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

describe('MissionProcessorService', () => {
  let processor: MissionProcessorService;
  let prisma: PrismaMock;
  let rankingGateway: ReturnType<typeof createRankingGatewayMock>;

  beforeEach(async () => {
    prisma = createPrismaMock();
    rankingGateway = createRankingGatewayMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MissionProcessorService,
        { provide: PrismaService, useValue: prisma },
        { provide: RankingGateway, useValue: rankingGateway },
      ],
    }).compile();

    processor = module.get<MissionProcessorService>(MissionProcessorService);
  });

  describe('processCompletion', () => {
    it('deve processar completion com sucesso', async () => {
      prisma.mission.findUnique.mockResolvedValue(makeMission({ points: 50 }));
      prisma.playerMission.count.mockResolvedValue(0);
      prisma.playerMission.findUnique.mockResolvedValue(null);
      prisma.$transaction.mockResolvedValue(makePlayerMission());

      const result = await processor.processCompletion('user-1', 'mission-1');

      expect(result).toBeDefined();
      expect(prisma.$transaction).toHaveBeenCalled();
      expect(rankingGateway.broadcastUpdate).toHaveBeenCalled();
    });

    it('deve lançar NotFoundException para missão inexistente', async () => {
      prisma.mission.findUnique.mockResolvedValue(null);

      await expect(
        processor.processCompletion('user-1', 'nonexistent'),
      ).rejects.toThrow(NotFoundException);
    });

    it('deve lançar ConflictException para missão ONCE já completada (limite atingido)', async () => {
      prisma.mission.findUnique.mockResolvedValue(
        makeMission({ frequency: 'ONCE', maxCompletions: 1 }),
      );
      prisma.playerMission.count.mockResolvedValue(1);

      await expect(
        processor.processCompletion('user-1', 'mission-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('deve lançar ConflictException para missão ONCE com limite atingido', async () => {
      prisma.mission.findUnique.mockResolvedValue(
        makeMission({ frequency: 'ONCE', maxCompletions: 3 }),
      );
      prisma.playerMission.count.mockResolvedValue(3);

      await expect(
        processor.processCompletion('user-1', 'mission-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('deve lançar ConflictException para missão recorrente já completada', async () => {
      prisma.mission.findUnique.mockResolvedValue(
        makeMission({ frequency: 'DAILY' }),
      );
      prisma.playerMission.findUnique.mockResolvedValue(makePlayerMission());

      await expect(
        processor.processCompletion('user-1', 'mission-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('deve tratar P2002 como ConflictException (última defesa)', async () => {
      prisma.mission.findUnique.mockResolvedValue(makeMission());
      prisma.playerMission.count.mockResolvedValue(0);
      prisma.playerMission.findUnique.mockResolvedValue(null);
      prisma.$transaction.mockRejectedValue(
        new PrismaClientKnownRequestError('Unique constraint', {
          code: 'P2002',
          clientVersion: '0.0.0',
        }),
      );

      await expect(
        processor.processCompletion('user-1', 'mission-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('deve relançar erros genéricos de infraestrutura', async () => {
      prisma.mission.findUnique.mockResolvedValue(makeMission());
      prisma.playerMission.count.mockResolvedValue(0);
      prisma.playerMission.findUnique.mockResolvedValue(null);
      prisma.$transaction.mockRejectedValue(new Error('DB connection lost'));

      await expect(
        processor.processCompletion('user-1', 'mission-1'),
      ).rejects.toThrow('DB connection lost');
    });

    it('deve incrementar pontos do usuário na transação', async () => {
      const mission = makeMission({ points: 100 });
      prisma.mission.findUnique.mockResolvedValue(mission);
      prisma.playerMission.count.mockResolvedValue(0);
      prisma.playerMission.findUnique.mockResolvedValue(null);
      prisma.$transaction.mockResolvedValue(makePlayerMission());

      await processor.processCompletion('user-1', 'mission-1');

      const txFn = prisma.$transaction.mock.calls[0][0];
      const tx = {
        playerMission: {
          create: jest.fn().mockResolvedValue(makePlayerMission()),
        },
        user: { update: jest.fn() },
      };
      await txFn(tx);

      expect(tx.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { points: { increment: 100 } },
      });
    });
  });
});
