import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RedisService } from 'src/redis/redis.service';
import { BotService } from './bot.service';
import { GameState, Board, GAME_TTL_SECONDS } from './game.types';

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

    await this.redis.set(
      `${this.KEY_PREFIX}${game.id}`,
      JSON.stringify(game),
      GAME_TTL_SECONDS,
    );

    return game;
  }

  async getGame(gameId: string): Promise<GameState | null> {
    const data = await this.redis.get(`${this.KEY_PREFIX}${gameId}`);
    if (!data) return null;
    return JSON.parse(data) as GameState;
  }

  async makeMove(
    gameId: string,
    userId: string,
    position: number,
  ): Promise<{ game: GameState; botMove?: number }> {
    const game = await this.getGame(gameId);

    if (!game) throw new NotFoundException('Jogo não encontrado');
    if (game.userId !== userId)
      throw new ConflictException('Jogo não pertence a este usuário');
    if (game.status !== 'playing')
      throw new ConflictException('Jogo já finalizado');
    if (game.currentPlayer !== 'X')
      throw new ConflictException('Não é seu turno');
    if (game.board[position] !== null)
      throw new ConflictException('Posição já ocupada');

    // Jogada do jogador
    game.board[position] = 'X';

    // Verificar se jogador ganhou
    if (this.checkWinner(game.board) === 'X') {
      game.status = 'won';
      await this.saveGame(game);
      return { game, botMove: undefined };
    }

    // Verificar empate
    if (this.checkDraw(game.board)) {
      game.status = 'draw';
      await this.saveGame(game);
      return { game, botMove: undefined };
    }

    // Turno do bot
    game.currentPlayer = 'O';
    const botPosition = this.botService.getBotMove(game.board);
    game.board[botPosition] = 'O';

    // Verificar se bot ganhou
    if (this.checkWinner(game.board) === 'O') {
      game.status = 'lost';
      await this.saveGame(game);
      return { game, botMove: botPosition };
    }

    // Verificar empate após jogada do bot
    if (this.checkDraw(game.board)) {
      game.status = 'draw';
      await this.saveGame(game);
      return { game, botMove: botPosition };
    }

    // Voltar para jogador
    game.currentPlayer = 'X';
    await this.saveGame(game);
    return { game, botMove: botPosition };
  }

  async deleteGame(gameId: string): Promise<void> {
    await this.redis.del(`${this.KEY_PREFIX}${gameId}`);
  }

  async findGamesByUserId(userId: string): Promise<GameState[]> {
    const keys = await this.redis.keys(`${this.KEY_PREFIX}*`);
    const games: GameState[] = [];

    for (const key of keys) {
      const game = await this.getGame(key.replace(this.KEY_PREFIX, ''));
      if (game && game.userId === userId && game.status === 'playing') {
        games.push(game);
      }
    }

    return games;
  }

  private async saveGame(game: GameState): Promise<void> {
    await this.redis.set(
      `${this.KEY_PREFIX}${game.id}`,
      JSON.stringify(game),
      GAME_TTL_SECONDS,
    );
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
