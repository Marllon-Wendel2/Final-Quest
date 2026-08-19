'use client';

import { MemoryCard, CHARACTER_IMAGES } from '../../../types/memory-game';
import styles from './MemoryGame.module.css';

interface MemoryGameCardProps {
  card: MemoryCard;
  onClick: () => void;
  isProcessing: boolean;
}

export default function MemoryGameCard({ card, onClick, isProcessing }: MemoryGameCardProps) {
  const isRevealed = card.isFlipped || card.isMatched;
  const isDisabled = isRevealed || isProcessing;

  const getCardContent = () => {
    if (!isRevealed) {
      return <span className={styles.cardBack}>?</span>;
    }

    switch (card.type) {
      case 'character':
        return (
          <img
            src={CHARACTER_IMAGES[card.characterName!]}
            alt={card.characterName}
            className={styles.cardImage}
          />
        );
      case 'bomb':
        return <span className={styles.cardBomb}>💣</span>;
      case 'star':
        return <span className={styles.cardStar}>⭐</span>;
      case 'empty':
        return <span className={styles.cardEmpty}>·</span>;
      default:
        return null;
    }
  };

  const getCardClassName = () => {
    const classes = [styles.card];

    if (isRevealed) {
      classes.push(styles.cardRevealed);
    }

    if (card.isMatched) {
      classes.push(styles.cardMatched);
    }

    if (card.type === 'bomb' && isRevealed) {
      classes.push(styles.cardBombEffect);
    }

    if (card.type === 'star' && isRevealed) {
      classes.push(styles.cardStarEffect);
    }

    return classes.join(' ');
  };

  return (
    <button
      className={getCardClassName()}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={isRevealed ? `Carta ${card.type}` : 'Carta virada'}
    >
      {getCardContent()}
    </button>
  );
}