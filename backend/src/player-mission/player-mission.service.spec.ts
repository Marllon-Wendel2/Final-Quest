/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment */
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMissionService } from './player-mission.service';
import { createPrismaMock, PrismaMock } from 'src/test/prisma.mock';
import { createRankingGatewayMock } from 'src/test/ranking-gateway.mock';
import { makeMission, makePlayerMission, makeUser } from 'src/test/fixtures';
import { PrismaService } from 'src/prisma/prisma.service';
import { RankingGateway } from 'src/raking/raking.gateway';

describe('PlayerMissionService', () => {
  let service: PlayerMissionService;
  let prisma: PrismaMock;
  let rankingGateway: ReturnType<typeof createRankingGatewayMock>;

  beforeEach(async () => {
    prisma = createPrismaMock();
    rankingGateway = createRankingGatewayMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerMissionService,
        { provide: PrismaService, useValue: prisma },
        { provide: RankingGateway, useValue: rankingGateway },
      ],
    }).compile();

    service = module.get<PlayerMissionService>(PlayerMissionService);
  });

  it('deve completar uma missão com sucesso', async () => {
    const mission = makeMission({ points: 50 });
    const userId = 'user-id-001';

    prisma.mission.findUnique.mockResolvedValue(mission);
    prisma.playerMission.findUnique.mockResolvedValue(null);

    const result = await service.completeMission(userId, mission.id);

    expect(prisma.$transaction).toHaveBeenCalled();
    expect(rankingGateway.broadcastUpdate).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id');
  });

  it('deve lançar ConflictException se missão já completada', async () => {
    const mission = makeMission();
    const existing = makePlayerMission();

    prisma.mission.findUnique.mockResolvedValue(mission);
    prisma.playerMission.findUnique.mockResolvedValue(existing);

    await expect(
      service.completeMission('user-id', mission.id),
    ).rejects.toThrow(ConflictException);
  });

  it('deve chamar rankingGateway.broadcastUpdate após sucesso', async () => {
    const mission = makeMission();

    prisma.mission.findUnique.mockResolvedValue(mission);
    prisma.playerMission.findUnique.mockResolvedValue(null);
    prisma.user.update.mockResolvedValue(makeUser());

    await service.completeMission('user-id', mission.id);

    expect(rankingGateway.broadcastUpdate).toHaveBeenCalledTimes(1);
  });

  it('deve tratar erro P2002 como ConflictException', async () => {
    const mission = makeMission();

    prisma.mission.findUnique.mockResolvedValue(mission);
    prisma.playerMission.findUnique.mockResolvedValue(null);

    // Simula erro de constraint unique (race condition)
    prisma.$transaction.mockRejectedValueOnce({ code: 'P2002' });

    await expect(
      service.completeMission('user-id', mission.id),
    ).rejects.toThrow(ConflictException);
  });

  it('deve retornar o PlayerMission criado com campos corretos', async () => {
    const mission = makeMission();
    const userId = 'user-id-001';

    prisma.mission.findUnique.mockResolvedValue(mission);
    prisma.playerMission.findUnique.mockResolvedValue(null);

    const result = await service.completeMission(userId, mission.id);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        userId: expect.any(String),
        missionId: expect.any(String),
        completedAt: expect.any(Date),
      }),
    );
  });
});
