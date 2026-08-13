import { RankingGateway } from '../raking/raking.gateway';

export function createRankingGatewayMock() {
  return {
    broadcastUpdate: jest.fn(),
  } as unknown as RankingGateway;
}
