'use client';

import { MemoryGameStatus } from '../../../types/memory-game';
import styles from './MemoryGame.module.css';

interface MemoryGameFooterProps {
  points: number;
  status: MemoryGameStatus;
  onClose: () => void;
}

export default function MemoryGameFooter({ points, status, onClose }: MemoryGameFooterProps) {
  const isGameOver = status === 'won' || status === 'lost' || status === 'timeout';

  return (
    <div className={styles.footer}>
      <div className={styles.reward}>
        <span className={styles.rewardIcon}>🏆</span>
        <span>{points} PONTOS</span>
      </div>

      {isGameOver && (
        <button className={`${styles.btn} ${styles.btnClose}`} onClick={onClose}>
          {status === 'won' ? 'CONTINUAR' : 'TENTAR NOVAMENTE'}
        </button>
      )}
    </div>
  );
}