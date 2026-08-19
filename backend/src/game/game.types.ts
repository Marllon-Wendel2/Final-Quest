export interface BaseGame {
  id: string;
  userId: string;
  missionId: string;
  status: string;
  createdAt: number;
}

export type BoardCell = string | null;
export type Board = BoardCell[];
export type Player = 'X' | 'O';
export type GameStatus = 'waiting' | 'playing' | 'won' | 'lost' | 'draw';

export interface GameState extends BaseGame {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner?: Player;
}

export const WINNING_COMBOS: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const GAME_TTL_SECONDS = 60;

export type MemoryCardType = 'character' | 'bomb' | 'star' | 'empty';

export interface MemoryCard {
  id: number;
  type: MemoryCardType;
  characterName?: 'Cultist' | 'Discoverer1' | 'Discoverer2';
  isFlipped: boolean;
  isMatched: boolean;
}

export type MemoryGameStatus =
  'waiting' | 'playing' | 'won' | 'lost' | 'timeout';

export interface MemoryGameState extends BaseGame {
  cards: MemoryCard[];
  flippedIndices: number[];
  matchedPairs: number;
  moves: number;
  maxMoves: number;
  timeLeft: number;
  maxTime: number;
  hasFreeMove: boolean;
  status: MemoryGameStatus;
  lastTickAt: number;
}

export const MEMORY_GAME_MAX_TIME = 60;
export const MEMORY_GAME_MAX_MOVES = 20;
export const MEMORY_GAME_TTL = 120;
export const MEMORY_CARD_BOMB_PENALTY = 2;
