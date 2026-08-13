import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://trippant-samira-shiny.ngrok-free.dev',
    ],
    credentials: true,
  },
})
@Injectable()
export class RankingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger('RankingGateway');

  constructor(private readonly jwtService: JwtService) {}

  afterInit() {
    this.logger.log('WebSocket Gateway inicializado');
  }

  handleConnection(client: Socket) {
    try {
      this.logger.log(`Cliente conectado: ${client.id}`);

      const token =
        client.handshake.headers.cookie
          ?.split('; ')
          .find((c) => c.startsWith('token='))
          ?.split('=')[1] ||
        (client.handshake.auth?.token as string) ||
        (client.handshake.query?.token as string);

      if (!token) {
        this.logger.warn(`Cliente ${client.id} conectou sem token`);
        client.disconnect();
        return;
      }

      this.jwtService.verify(token);
      this.logger.log(`Cliente conectado: ${client.id}`);
    } catch {
      this.logger.warn(`Cliente ${client.id} com token inválido`);
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  broadcastUpdate() {
    this.logger.log('Broadcasting ranking update');
    this.server.emit('ranking-updated');
  }
}
