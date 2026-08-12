import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMissionService } from './player-mission.service';

describe('PlayerMissionService', () => {
  let service: PlayerMissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerMissionService],
    }).compile();

    service = module.get<PlayerMissionService>(PlayerMissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
