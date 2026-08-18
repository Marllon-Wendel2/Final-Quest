export type BoardCell = string | null;
export type Board = BoardCell[];
export type Player = 'X' | 'O';
export type GameStatus = 'waiting' | 'playing' | 'won' | 'lost' | 'draw';

export interface GameState {
  id: string;
  userId: string;
  missionId: string;
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner?: Player;
  createdAt: number;
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
