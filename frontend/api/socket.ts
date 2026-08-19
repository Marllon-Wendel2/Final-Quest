import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

// Tipos para eventos de jogo
export interface GameCreatedEvent {
  gameId: string;
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
}

export interface GameUpdatedEvent {
  board: (string | null)[];
  status: 'playing' | 'won' | 'lost' | 'draw';
  currentPlayer: 'X' | 'O';
  botMove?: number;
}

export interface GameOverEvent {
  result: 'won' | 'lost' | 'draw';
  winner?: 'X' | 'O';
}

export function getSocket(): Socket {
  if (!socket) {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    socket = io(url, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('[Socket] Conectado:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('[Socket] Desconectado:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('[Socket] Erro de conexão:', error.message);
    });
  }

  return socket;
}

// ==================== GAME EVENTS ====================

export function emitStartGame(missionId: string) {
  getSocket().emit('start-game', { missionId });
}

export function emitPlayerMove(gameId: string, position: number) {
  getSocket().emit('player-move', { gameId, position });
}

export function onGameCreated(callback: (data: GameCreatedEvent) => void) {
  getSocket().on('game-created', callback);
}

export function onGameUpdated(callback: (data: GameUpdatedEvent) => void) {
  getSocket().on('game-updated', callback);
}

export function onGameOver(callback: (data: GameOverEvent) => void) {
  getSocket().on('game-over', callback);
}

export function onGameError(callback: (data: { message: string }) => void) {
  getSocket().on('error', callback);
}

export function offGameEvents() {
  const s = getSocket();
  s.off('game-created');
  s.off('game-updated');
  s.off('game-over');
  s.off('error');
}
