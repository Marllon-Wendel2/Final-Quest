import { CardFlippedEvent, CardsHiddenEvent, MemoryGameCreatedEvent, MemoryGameOverEvent, TimerSyncEvent } from '@/app/types/memory-game';
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

export function emitStartMemoryGame(missionId: string) {
  getSocket().emit('start-memory-game', { missionId });
}

export function emitFlipCard(gameId: string, cardIndex: number) {
  getSocket().emit('flip-card', { gameId, cardIndex });
}

export function emitRequestTimerSync(gameId: string) {
  getSocket().emit('request-timer-sync', { gameId });
}

export function onMemoryGameCreated(callback: (data: MemoryGameCreatedEvent) => void) {
  getSocket().on('memory-game-created', callback);
}

export function onCardFlipped(callback: (data: CardFlippedEvent) => void) {
  getSocket().on('card-flipped', callback);
}

export function onCardsHidden(callback: (data: CardsHiddenEvent) => void) {
  getSocket().on('cards-hidden', callback);
}

export function onTimerSync(callback: (data: TimerSyncEvent) => void) {
  getSocket().on('timer-sync', callback);
}

export function onMemoryGameOver(callback: (data: MemoryGameOverEvent) => void) {
  getSocket().on('memory-game-over', callback);
}

export function offMemoryGameEvents() {
  const s = getSocket();
  s.off('memory-game-created');
  s.off('card-flipped');
  s.off('cards-hidden');
  s.off('timer-sync');
  s.off('memory-game-over');
  s.off('error');
}
