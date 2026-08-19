'use client';

import MemoryGameHeader from './MemoryGameHeader';
import MemoryGameStatus from './MemoryGameStatus';
import MemoryGameBoard from './MemoryGameBoard';
import MemoryGameLegend from './MemoryGameLegend';
import MemoryGameFooter from './MemoryGameFooter';
import styles from './MemoryGame.module.css';
import { useMemoryGame } from '../../../../hooks/useMemoryGame';
import GameResultAnimation from '../../GameResultAnimation';

interface MemoryGameProps {
  missionId: string;
  missionTitle: string;
  points: number;
  onSuccess: () => void;
  onClose: () => void;
}

export default function MemoryGame({
  missionId,
  missionTitle,
  points,
  onSuccess,
  onClose,
}: MemoryGameProps) {
  const {
    cards,
    status,
    timeLeft,
    moves,
    matchedPairs,
    hasFreeMove,
    gameResult,
    statusText,
    statusColor,
    handleCardClick,
    handleResultComplete,
    isProcessing,
  } = useMemoryGame(missionId, onSuccess, onClose);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <MemoryGameHeader missionTitle={missionTitle} onClose={onClose} />
        <MemoryGameStatus
          text={statusText}
          color={statusColor}
          timeLeft={timeLeft}
          moves={moves}
          maxMoves={20}
          matchedPairs={matchedPairs}
          hasFreeMove={hasFreeMove}
        />
        <MemoryGameBoard
          cards={cards}
          onCardClick={handleCardClick}
          isProcessing={isProcessing}
        />
        <MemoryGameLegend />
        <MemoryGameFooter points={points} status={status} onClose={onClose} />
      </div>

      {gameResult && (
        <GameResultAnimation
          result={gameResult}
          missionTitle={missionTitle}
          points={points}
          onComplete={handleResultComplete}
        />
      )}
    </div>
  );
}