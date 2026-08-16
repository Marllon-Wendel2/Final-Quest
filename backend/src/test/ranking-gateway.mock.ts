import { RankingGateway } from '../ranking/ranking.gateway';

export function createRankingGatewayMock() {
  return {
    broadcastUpdate: jest.fn(),
  } as unknown as RankingGateway;
}
