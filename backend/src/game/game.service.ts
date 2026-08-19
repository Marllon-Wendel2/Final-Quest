import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RedisService } from 'src/redis/redis.service';
import { BotService } from './bot.service';
import { GameState, Board, GAME_TTL_SECONDS } from './game.types';
import {
  validateOwnership,
  validateStatus,
  getGame,
  saveGame,
  deleteGame,
  findGamesByUserId,
} from './game.utils';

@Injectable()
export class GameService {
  private readonly KEY_PREFIX = 'game:';

  constructor(
    private readonly redis: RedisService,
    private readonly botService: BotService,
  ) {}

  async createGame(userId: string, missionId: string): Promise<GameState> {
    const game: GameState = {
      id: randomUUID(),
      userId,
      missionId,
      board: Array(9).fill(null) as Board,
      currentPlayer: 'X',
      status: 'playing',
      createdAt: Date.now(),
    };

    await saveGame(this.redis, this.KEY_PREFIX, game, GAME_TTL_SECONDS);
    return game;
  }

  async getGame(gameId: string): Promise<GameState | null> {
    return getGame<GameState>(this.redis, this.KEY_PREFIX, gameId);
  }

  async makeMove(
    gameId: string,
    userId: string,
    position: number,
  ): Promise<{ game: GameState; botMove?: number }> {
    const game = await this.getGame(gameId);
    if (!game) throw new NotFoundException('Jogo não encontrado');

    validateOwnership(game, userId);
    validateStatus(game, 'playing');
    this.validatePlayerMove(game, position);

    game.board[position] = 'X';

    if (this.checkWinner(game.board) === 'X') {
      game.status = 'won';
      await saveGame(this.redis, this.KEY_PREFIX, game, GAME_TTL_SECONDS);
      return { game };
    }

    if (this.checkDraw(game.board)) {
      game.status = 'draw';
      await saveGame(this.redis, this.KEY_PREFIX, game, GAME_TTL_SECONDS);
      return { game };
    }

    const botPosition = this.executeBotMove(game);

    await saveGame(this.redis, this.KEY_PREFIX, game, GAME_TTL_SECONDS);
    return { game, botMove: botPosition };
  }

  async deleteGame(gameId: string): Promise<void> {
    await deleteGame(this.redis, this.KEY_PREFIX, gameId);
  }

  async findGamesByUserId(userId: string): Promise<GameState[]> {
    return findGamesByUserId<GameState>(
      this.redis,
      this.KEY_PREFIX,
      userId,
      'playing',
    );
  }

  private validatePlayerMove(game: GameState, position: number): void {
    if (game.currentPlayer !== 'X') {
      throw new ConflictException('Não é seu turno');
    }
    if (game.board[position] !== null) {
      throw new ConflictException('Posição já ocupada');
    }
  }

  private executeBotMove(game: GameState): number {
    game.currentPlayer = 'O';
    const botPosition = this.botService.getBotMove(game.board);
    game.board[botPosition] = 'O';

    if (this.checkWinner(game.board) === 'O') {
      game.status = 'lost';
    } else if (this.checkDraw(game.board)) {
      game.status = 'draw';
    } else {
      game.currentPlayer = 'X';
    }

    return botPosition;
  }

  private checkWinner(board: Board): 'X' | 'O' | null {
    for (const [a, b, c] of [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as 'X' | 'O';
      }
    }
    return null;
  }

  private checkDraw(board: Board): boolean {
    return board.every((cell) => cell !== null);
  }
}
