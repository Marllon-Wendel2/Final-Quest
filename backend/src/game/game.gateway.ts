import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GameService } from './game.service';
import { MemoryGameService } from './memory-game.service';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://trippant-samira-shiny.ngrok-free.dev',
      'https://final-quest.vercel.app',
    ],
    credentials: true,
  },
})
@Injectable()
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(GameGateway.name);
  private userSockets = new Map<string, string>();

  constructor(
    private readonly gameService: GameService,
    private readonly memoryGameService: MemoryGameService,
    private readonly jwtService: JwtService,
  ) {}

  async handleDisconnect(client: Socket) {
    const userId = this.userSockets.get(client.id);
    this.userSockets.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);

    if (userId) {
      const tttGames = await this.gameService.findGamesByUserId(userId);
      for (const game of tttGames) {
        await this.gameService.deleteGame(game.id);
      }

      const memoryGames =
        await this.memoryGameService.findGamesByUserId(userId);
      for (const game of memoryGames) {
        await this.memoryGameService.deleteGame(game.id);
      }
    }
  }

  private extractUserId(client: Socket): string | null {
    try {
      const token =
        client.handshake.headers.cookie
          ?.split('; ')
          .find((c) => c.startsWith('token='))
          ?.split('=')[1] || (client.handshake.auth?.token as string);

      if (!token) return null;

      const payload = this.jwtService.verify<{ sub: string }>(token);
      return payload.sub;
    } catch {
      return null;
    }
  }

  @SubscribeMessage('start-game')
  async handleStartGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { missionId: string },
  ) {
    const userId = this.extractUserId(client);
    if (!userId) {
      client.emit('error', { message: 'Não autenticado' });
      return;
    }

    try {
      const game = await this.gameService.createGame(userId, data.missionId);
      this.userSockets.set(client.id, userId);
      client.emit('game-created', {
        gameId: game.id,
        board: game.board,
        currentPlayer: game.currentPlayer,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      client.emit('error', { message });
    }
  }

  @SubscribeMessage('player-move')
  async handlePlayerMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string; position: number },
  ) {
    const userId = this.extractUserId(client);
    if (!userId) {
      client.emit('error', { message: 'Não autenticado' });
      return;
    }

    try {
      const result = await this.gameService.makeMove(
        data.gameId,
        userId,
        data.position,
      );

      client.emit('game-updated', {
        board: result.game.board,
        status: result.game.status,
        currentPlayer: result.game.currentPlayer,
        botMove: result.botMove,
      });

      if (result.game.status !== 'playing') {
        client.emit('game-over', {
          result: result.game.status,
          winner: result.game.winner,
        });
        await this.gameService.deleteGame(data.gameId);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      client.emit('error', { message });
    }
  }

  @SubscribeMessage('start-memory-game')
  async handleStartMemoryGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { missionId: string },
  ) {
    const userId = this.extractUserId(client);
    if (!userId) {
      client.emit('error', { message: 'Não autenticado' });
      return;
    }

    try {
      const game = await this.memoryGameService.createGame(
        userId,
        data.missionId,
      );
      this.userSockets.set(client.id, userId);

      client.emit('memory-game-created', {
        gameId: game.id,
        cards: game.cards,
        timeLeft: game.timeLeft,
        maxMoves: game.maxMoves,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      client.emit('error', { message });
    }
  }

  @SubscribeMessage('flip-card')
  async handleFlipCard(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string; cardIndex: number },
  ) {
    const userId = this.extractUserId(client);
    if (!userId) {
      client.emit('error', { message: 'Não autenticado' });
      return;
    }

    try {
      const result = await this.memoryGameService.flipCard(
        data.gameId,
        userId,
        data.cardIndex,
      );

      // Enviar carta revelada com flag canPlay do backend
      client.emit('card-flipped', {
        gameId: result.game.id,
        cardIndex: data.cardIndex,
        card: result.revealedCard,
        effect: result.effect,
        moves: result.game.moves,
        timeLeft: result.game.timeLeft,
        matchedPairs: result.game.matchedPairs,
        hasFreeMove: result.game.hasFreeMove,
        canPlay: result.canPlay,
      });

      // Se flippedIndices vazio (2ª carta processada ou card vazio), esconder após delay
      if (
        result.game.flippedIndices.length === 0 &&
        result.game.status === 'playing' &&
        result.effect !== 'match'
      ) {
        // Esperar 1 segundo para animação, depois esconder
        const gameId = data.gameId;
        const socketClient = client;
        setTimeout(() => {
          this.memoryGameService
            .hideFlippedCards(gameId)
            .then((hiddenCards) => {
              if (hiddenCards) {
                socketClient.emit('cards-hidden', {
                  gameId,
                  cards: hiddenCards,
                  canPlay: true,
                });
              }
            })
            .catch((err) => this.logger.error('Erro ao esconder cartas:', err));
        }, 1000);
      }

      if (result.game.status !== 'playing') {
        client.emit('memory-game-over', {
          result: result.game.status,
          moves: result.game.moves,
          timeLeft: result.game.timeLeft,
        });
        await this.memoryGameService.deleteGame(data.gameId);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      client.emit('error', { message });
    }
  }

  @SubscribeMessage('request-timer-sync')
  async handleRequestTimerSync(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string },
  ) {
    const userId = this.extractUserId(client);
    if (!userId) {
      client.emit('error', { message: 'Não autenticado' });
      return;
    }

    try {
      const game = await this.memoryGameService.getGame(data.gameId);
      if (!game) {
        client.emit('error', { message: 'Jogo não encontrado' });
        return;
      }

      // Calcular tempo real baseado no timestamp
      const now = Date.now();
      const elapsed = Math.floor((now - game.lastTickAt) / 1000);
      const realTimeLeft = Math.max(0, game.timeLeft - elapsed);

      client.emit('timer-sync', {
        gameId: game.id,
        timeLeft: realTimeLeft,
        status: realTimeLeft <= 0 ? 'timeout' : game.status,
      });

      // Se tempo esgotou, finalizar jogo
      if (realTimeLeft <= 0 && game.status === 'playing') {
        await this.memoryGameService.handleTimeout(data.gameId);
        client.emit('memory-game-over', {
          result: 'timeout',
          moves: game.moves,
          timeLeft: 0,
        });
        await this.memoryGameService.deleteGame(data.gameId);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      client.emit('error', { message });
    }
  }
}
