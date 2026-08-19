import { BadRequestException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { BaseGame } from './game.types';

export function validateOwnership(game: BaseGame, userId: string): void {
  if (game.userId !== userId) {
    throw new BadRequestException('Jogo não pertence a este usuário');
  }
}

export function validateStatus(game: BaseGame, expectedStatus: string): void {
  if (game.status !== expectedStatus) {
    throw new BadRequestException('Jogo já finalizado');
  }
}

export async function getGame<T extends BaseGame>(
  redis: RedisService,
  prefix: string,
  gameId: string,
): Promise<T | null> {
  const data = await redis.get(`${prefix}${gameId}`);
  if (!data) return null;
  return JSON.parse(data) as T;
}

export async function saveGame<T extends BaseGame>(
  redis: RedisService,
  prefix: string,
  game: T,
  ttl: number,
): Promise<void> {
  await redis.set(`${prefix}${game.id}`, JSON.stringify(game), ttl);
}

export async function deleteGame(
  redis: RedisService,
  prefix: string,
  gameId: string,
): Promise<void> {
  await redis.del(`${prefix}${gameId}`);
}

export async function findGamesByUserId<T extends BaseGame>(
  redis: RedisService,
  prefix: string,
  userId: string,
  statusFilter?: string,
): Promise<T[]> {
  const keys = await redis.keys(`${prefix}*`);
  const games: T[] = [];

  for (const key of keys) {
    const game = await getGame<T>(redis, prefix, key.replace(prefix, ''));
    if (game && game.userId === userId && (!statusFilter || game.status === statusFilter)) {
      games.push(game);
    }
  }

  return games;
}
