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

  // Mapa de socketId → userId para rastrear conexões
  private userSockets = new Map<string, string>();

  constructor(
    private readonly gameService: GameService,
    private readonly jwtService: JwtService,
  ) {}

  async handleDisconnect(client: Socket) {
    const userId = this.userSockets.get(client.id);
    this.userSockets.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);

    if (userId) {
      const games = await this.gameService.findGamesByUserId(userId);
      for (const game of games) {
        await this.gameService.deleteGame(game.id);
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
}
