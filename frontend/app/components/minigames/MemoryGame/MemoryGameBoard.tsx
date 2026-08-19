'use client';

import { MemoryCard } from '../../../types/memory-game';
import MemoryGameCard from './MemoryGameCard';
import styles from './MemoryGame.module.css';

interface MemoryGameBoardProps {
  cards: MemoryCard[];
  onCardClick: (index: number) => void;
  isProcessing: boolean;
}

export default function MemoryGameBoard({ cards, onCardClick, isProcessing }: MemoryGameBoardProps) {
  return (
    <div className={styles.board}>
      {cards.map((card, index) => (
        <MemoryGameCard
          key={card.id}
          card={card}
          onClick={() => onCardClick(index)}
          isProcessing={isProcessing}
        />
      ))}
    </div>
  );
}