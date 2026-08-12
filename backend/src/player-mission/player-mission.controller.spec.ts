import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMissionController } from './player-mission.controller';
import { PlayerMissionService } from './player-mission.service';

describe('PlayerMissionController', () => {
  let controller: PlayerMissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerMissionController],
      providers: [PlayerMissionService],
    }).compile();

    controller = module.get<PlayerMissionController>(PlayerMissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
