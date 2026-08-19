export type MemoryCardType = 'character' | 'bomb' | 'star' | 'empty';

export interface MemoryCard {
  id: number;
  type: MemoryCardType;
  characterName?: 'Cultist' | 'Discoverer1' | 'Discoverer2';
  isFlipped: boolean;
  isMatched: boolean;
}

export type MemoryGameStatus = 'waiting' | 'playing' | 'won' | 'lost' | 'timeout';

export interface MemoryGameState {
  gameId: string;
  cards: MemoryCard[];
  timeLeft: number;
  maxMoves: number;
  moves: number;
  matchedPairs: number;
  hasFreeMove: boolean;
  status: MemoryGameStatus;
}

export interface MemoryGameCreatedEvent {
  gameId: string;
  cards: MemoryCard[];
  timeLeft: number;
  maxMoves: number;
}

export interface CardFlippedEvent {
  gameId: string;
  cardIndex: number;
  card: MemoryCard;
  effect: 'none' | 'bomb' | 'star' | 'match' | 'empty';
  moves: number;
  timeLeft: number;
  matchedPairs: number;
  hasFreeMove: boolean;
  canPlay: boolean;
}

export interface CardsHiddenEvent {
  gameId: string;
  cards: MemoryCard[];
  canPlay: boolean;
}

export interface TimerSyncEvent {
  gameId: string;
  timeLeft: number;
  status: MemoryGameStatus;
}

export interface MemoryGameOverEvent {
  result: 'won' | 'lost' | 'timeout';
  moves: number;
  timeLeft: number;
}

export const CHARACTER_IMAGES: Record<string, string> = {
  Cultist: '/personagens/Cultist.png',
  Discoverer1: '/personagens/Discoverer1_bends_over.png',
  Discoverer2: '/personagens/Discoverer2_exploring.png',
};