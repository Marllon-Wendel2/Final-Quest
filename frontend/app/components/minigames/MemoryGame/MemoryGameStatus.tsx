'use client';

import styles from './MemoryGame.module.css';

interface MemoryGameStatusProps {
  text: string;
  color: string;
  timeLeft: number;
  moves: number;
  maxMoves: number;
  matchedPairs: number;
  hasFreeMove: boolean;
}

export default function MemoryGameStatus({
  text,
  color,
  timeLeft,
  moves,
  maxMoves,
  matchedPairs,
  hasFreeMove,
}: MemoryGameStatusProps) {
  const timeColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#f97316' : 'var(--gold)';
  const movesColor = moves >= maxMoves - 5 ? '#ef4444' : 'var(--gold)';

  return (
    <div className={styles.statusContainer}>
      <div className={styles.status} style={{ color }}>
        {text}
      </div>
      
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>TEMPO</span>
          <span className={styles.statValue} style={{ color: timeColor }}>
            {timeLeft}s
          </span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.statLabel}>JOGADAS</span>
          <span className={styles.statValue} style={{ color: movesColor }}>
            {moves}/{maxMoves}
          </span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.statLabel}>PARES</span>
          <span className={styles.statValue}>{matchedPairs}/3</span>
        </div>
      </div>

      {hasFreeMove && (
        <div className={styles.freeMoveIndicator}>
          ★ PRÓXIMA JOGADA GRÁTIS
        </div>
      )}
    </div>
  );
}