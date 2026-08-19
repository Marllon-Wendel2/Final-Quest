import { GameStatus } from '../../../../hooks/useTicTacToe';
import styles from './TicTacToe.module.css';

interface TicTacToeFooterProps {
  points: number;
  status: GameStatus;
  onClose: () => void;
}

export default function TicTacToeFooter({ points, status, onClose }: TicTacToeFooterProps) {
  return (
    <>
      <div className={styles.reward}>
        <span className={styles.rewardIcon}>💎</span>
        <span className={styles.rewardText}>{points} PTS</span>
      </div>

      {(status === 'lost' || status === 'draw') && (
        <button onClick={onClose} className={`${styles.btn} ${styles.btnClose}`}>
          FECHAR
        </button>
      )}
    </>
  );
}