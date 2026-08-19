'use client';

import TicTacToeHeader from './TicTacToeHeader';
import TicTacToeStatus from './TicTacToeStatus';
import TicTacToeFooter from './TicTacToeFooter';
import styles from './TicTacToe.module.css';
import { useTicTacToe } from '../../../../hooks/useTicTacToe';
import TicTacToeBoard from './TicTacToeBoard';
import GameResultAnimation from '../../GameResultAnimation';

interface TicTacToeProps {
  missionId: string;
  missionTitle: string;
  points: number;
  onSuccess: () => void;
  onClose: () => void;
}

export default function TicTacToe({
  missionId,
  missionTitle,
  points,
  onSuccess,
  onClose,
}: TicTacToeProps) {
  const {
    board,
    status,
    isPlayerTurn,
    lastBotMove,
    gameResult,
    statusText,
    statusColor,
    handleCellClick,
    handleResultComplete,
  } = useTicTacToe(missionId, onSuccess, onClose);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <TicTacToeHeader missionTitle={missionTitle} onClose={onClose} />
        <TicTacToeStatus text={statusText} color={statusColor} />
        <TicTacToeBoard
          board={board}
          onCellClick={handleCellClick}
          lastBotMove={lastBotMove}
          isPlayerTurn={isPlayerTurn}
          status={status}
        />
        <TicTacToeFooter points={points} status={status} onClose={onClose} />
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