type TransactionClient = {
  playerMission: { create: jest.Mock };
  user: { update: jest.Mock };
};

export type PrismaMock = {
  mission: { findUnique: jest.Mock };
  playerMission: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    count: jest.Mock;
    create: jest.Mock;
  };
  user: { update: jest.Mock };
  $transaction: jest.Mock;
};

export function createPrismaMock(): PrismaMock {
  const transactionClient: TransactionClient = {
    playerMission: {
      create: jest.fn().mockReturnValue({
        id: 'pmock-id',
        userId: 'umock-id',
        missionId: 'mmock-id',
        completedAt: new Date(),
        resetWindow: 'once',
      }),
    },
    user: {
      update: jest.fn(),
    },
  };

  return {
    mission: {
      findUnique: jest.fn(),
    },
    playerMission: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
    },
    user: {
      update: jest.fn(),
    },
    $transaction: jest.fn((fn: (tx: TransactionClient) => unknown) => {
      return fn(transactionClient);
    }),
  };
}
