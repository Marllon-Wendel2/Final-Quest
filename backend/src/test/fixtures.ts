import { User, Mission, PlayerMission } from '@prisma/client';

export function makeUser(overrides?: Partial<User>): User {
  return {
    id: 'user-id-001',
    email: 'test@example.com',
    name: 'Test User',
    hashPassword: 'hashed-password',
    role: 'USER',
    points: 0,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    ...overrides,
  };
}

export function makeMission(overrides?: Partial<Mission>): Mission {
  return {
    id: 'mission-id-001',
    title: 'Test Mission',
    description: 'A test mission',
    points: 50,
    createdAt: new Date('2026-01-01'),
    frequency: 'ONCE',
    maxCompletions: 1,
    ...overrides,
  };
}

export function makePlayerMission(
  overrides?: Partial<PlayerMission>,
): PlayerMission {
  return {
    id: 'pm-id-001',
    userId: 'user-id-001',
    missionId: 'mission-id-001',
    completedAt: new Date('2026-01-01'),
    resetWindow: 'once',
    ...overrides,
  };
}
