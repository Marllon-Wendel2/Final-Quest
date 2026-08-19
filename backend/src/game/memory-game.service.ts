import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RedisService } from 'src/redis/redis.service';
import {
  MemoryGameState,
  MemoryCard,
  MemoryCardType,
  MEMORY_GAME_MAX_TIME,
  MEMORY_GAME_MAX_MOVES,
  MEMORY_GAME_TTL,
  MEMORY_CARD_BOMB_PENALTY,
} from './game.types';
import {
  validateOwnership,
  validateStatus,
  getGame,
  saveGame,
  deleteGame,
  findGamesByUserId,
} from './game.utils';

type FlipResult = {
  game: MemoryGameState;
  revealedCard: MemoryCard;
  effect: 'none' | 'bomb' | 'star' | 'match' | 'empty';
  canPlay: boolean;
};

@Injectable()
export class MemoryGameService {
  private readonly KEY_PREFIX = 'memory-game:';

  constructor(private readonly redis: RedisService) {}

  async createGame(
    userId: string,
    missionId: string,
  ): Promise<MemoryGameState> {
    const cards = this.generateAndShuffleCards();

    const game: MemoryGameState = {
      id: randomUUID(),
      userId,
      missionId,
      cards,
      flippedIndices: [],
      matchedPairs: 0,
      moves: 0,
      maxMoves: MEMORY_GAME_MAX_MOVES,
      timeLeft: MEMORY_GAME_MAX_TIME,
      maxTime: MEMORY_GAME_MAX_TIME,
      hasFreeMove: false,
      status: 'playing',
      createdAt: Date.now(),
      lastTickAt: Date.now(),
    };

    await saveGame(this.redis, this.KEY_PREFIX, game, MEMORY_GAME_TTL);
    return game;
  }

  async getGame(gameId: string): Promise<MemoryGameState | null> {
    return getGame<MemoryGameState>(this.redis, this.KEY_PREFIX, gameId);
  }

  async flipCard(
    gameId: string,
    userId: string,
    cardIndex: number,
  ): Promise<FlipResult> {
    const game = await this.getGame(gameId);
    if (!game) throw new NotFoundException(`Game not found: ${gameId}`);

    validateOwnership(game, userId);
    validateStatus(game, 'playing');

    const now = Date.now();
    const elapsed = Math.floor((now - game.lastTickAt) / 1000);
    if (elapsed >= 1) {
      game.timeLeft = Math.max(0, game.timeLeft - elapsed);
      game.lastTickAt = now;
    }

    if (cardIndex < 0 || cardIndex >= game.cards.length) {
      throw new BadRequestException('Índice de carta inválido');
    }
    if (game.cards[cardIndex].isFlipped || game.cards[cardIndex].isMatched) {
      throw new BadRequestException('Carta já virada ou já foi matched');
    }

    if (game.flippedIndices.length >= 2) {
      throw new ConflictException('Aguarde a comparação das cartas');
    }

    game.cards[cardIndex].isFlipped = true;
    game.flippedIndices.push(cardIndex);

    const revealedCard = { ...game.cards[cardIndex] };
    const card = game.cards[cardIndex];

    let effect: FlipResult['effect'] = 'none';
    let canPlay = false;

    if (this.isSpecialCard(card)) {
      this.consumeMove(game);
      effect = this.applySpecialCardEffects(game, cardIndex);
      this.checkGameEnd(game);
    } else if (game.flippedIndices.length === 2) {
      const result = this.handleSecondCharacterCard(game);
      effect = result.effect;
      canPlay = result.canPlay;
      if (result.isMatch) {
        revealedCard.isMatched = true;
      }
    } else {
      canPlay = true;
    }

    await saveGame(this.redis, this.KEY_PREFIX, game, MEMORY_GAME_TTL);
    return { game, revealedCard, effect, canPlay };
  }

  async tickTimer(gameId: string): Promise<MemoryGameState | null> {
    const game = await this.getGame(gameId);
    if (!game || game.status !== 'playing') return null;

    const now = Date.now();
    const elapsed = Math.floor((now - game.lastTickAt) / 1000);

    if (elapsed >= 1) {
      game.timeLeft = Math.max(0, game.timeLeft - elapsed);
      game.lastTickAt = now;

      if (game.timeLeft <= 0) {
        game.status = 'timeout';
      }

      await saveGame(this.redis, this.KEY_PREFIX, game, MEMORY_GAME_TTL);
    }

    return game;
  }

  async deleteGame(gameId: string): Promise<void> {
    await deleteGame(this.redis, this.KEY_PREFIX, gameId);
  }

  async hideFlippedCards(gameId: string): Promise<MemoryCard[] | null> {
    const game = await this.getGame(gameId);
    if (!game || game.status !== 'playing') return null;

    game.cards = game.cards.map((card) => ({
      ...card,
      isFlipped: card.isMatched ? card.isFlipped : false,
    }));

    await saveGame(this.redis, this.KEY_PREFIX, game, MEMORY_GAME_TTL);
    return game.cards;
  }

  async handleTimeout(gameId: string): Promise<MemoryGameState | null> {
    const game = await this.getGame(gameId);
    if (!game || game.status !== 'playing') return null;

    game.status = 'timeout';
    game.timeLeft = 0;
    await saveGame(this.redis, this.KEY_PREFIX, game, MEMORY_GAME_TTL);
    return game;
  }

  async findGamesByUserId(userId: string): Promise<MemoryGameState[]> {
    return findGamesByUserId<MemoryGameState>(
      this.redis,
      this.KEY_PREFIX,
      userId,
      'playing',
    );
  }

  private generateAndShuffleCards(): MemoryCard[] {
    const cards = [
      ...this.createCharacterCards(),
      ...this.createSimpleCards('bomb', 2),
      ...this.createSimpleCards('star', 1),
      ...this.createSimpleCards('empty', 6),
    ].map((card, id) => ({ ...card, id }));

    return this.shuffleCards(cards);
  }

  private createCharacterCards(): MemoryCard[] {
    const characters: Array<'Cultist' | 'Discoverer1' | 'Discoverer2'> = [
      'Cultist',
      'Discoverer1',
      'Discoverer2',
    ];

    return characters.flatMap((name) =>
      Array.from({ length: 2 }, () => ({
        id: 0,
        type: 'character' as const,
        characterName: name,
        isFlipped: false,
        isMatched: false,
      })),
    );
  }

  private createSimpleCards(
    type: Exclude<MemoryCardType, 'character'>,
    count: number,
  ): MemoryCard[] {
    return Array.from({ length: count }, () => ({
      id: 0,
      type,
      isFlipped: false,
      isMatched: false,
    }));
  }

  private shuffleCards(cards: MemoryCard[]): MemoryCard[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private isSpecialCard(card: MemoryCard): boolean {
    return (
      card.type === 'bomb' || card.type === 'star' || card.type === 'empty'
    );
  }

  private consumeMove(game: MemoryGameState): void {
    if (game.hasFreeMove) {
      game.hasFreeMove = false;
    } else {
      game.moves++;
    }
  }

  private applySpecialCardEffects(
    game: MemoryGameState,
    cardIndex: number,
  ): FlipResult['effect'] {
    const cardType = game.cards[cardIndex].type;

    game.flippedIndices = [];

    if (cardType === 'bomb') {
      game.timeLeft = Math.max(0, game.timeLeft - MEMORY_CARD_BOMB_PENALTY);
      return 'bomb';
    }

    if (cardType === 'star') {
      game.hasFreeMove = true;
      return 'star';
    }

    return 'empty';
  }

  private checkGameEnd(game: MemoryGameState): void {
    if (game.status !== 'playing') return;

    if (game.timeLeft <= 0) {
      game.status = 'timeout';
      return;
    }

    if (game.moves >= game.maxMoves) {
      game.status = 'lost';
    }
  }

  private handleSecondCharacterCard(game: MemoryGameState): {
    effect: FlipResult['effect'];
    canPlay: boolean;
    isMatch: boolean;
  } {
    const [idx1, idx2] = game.flippedIndices;
    const card1 = game.cards[idx1];
    const card2 = game.cards[idx2];

    this.consumeMove(game);

    const isMatch =
      card1.type === 'character' &&
      card2.type === 'character' &&
      card1.characterName === card2.characterName;

    if (isMatch) {
      card1.isMatched = true;
      card2.isMatched = true;
      game.matchedPairs++;

      if (game.matchedPairs >= 3) {
        game.status = 'won';
      }
    }

    game.flippedIndices = [];
    this.checkGameEnd(game);

    return {
      effect: isMatch ? 'match' : 'none',
      canPlay: isMatch,
      isMatch,
    };
  }
}
