import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMissionsController } from './player-mission.controller';
import { PlayerMissionService } from './player-mission.service';

describe('PlayerMissionsController', () => {
  let controller: PlayerMissionsController;
  let service: { completeMission: jest.Mock; getPlayerHistory: jest.Mock };

  beforeEach(async () => {
    service = {
      completeMission: jest.fn(),
      getPlayerHistory: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerMissionsController],
      providers: [{ provide: PlayerMissionService, useValue: service }],
    }).compile();

    controller = module.get<PlayerMissionsController>(PlayerMissionsController);
  });

  it('deve chamar completeMission com userId e missionId', async () => {
    const req = { user: { id: 'user-id-001' } };
    service.completeMission.mockResolvedValue({ id: 'pm-1' });

    await controller.complete('mission-id-001', req);

    expect(service.completeMission).toHaveBeenCalledWith(
      'user-id-001',
      'mission-id-001',
    );
  });

  it('deve chamar getPlayerHistory com userId', async () => {
    const req = { user: { id: 'user-id-001' } };
    service.getPlayerHistory.mockResolvedValue([]);

    await controller.getMyMissions(req);

    expect(service.getPlayerHistory).toHaveBeenCalledWith('user-id-001');
  });
});
