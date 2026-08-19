import { GameStatus } from '../../../../hooks/useTicTacToe';
import styles from './TicTacToe.module.css';

type Board = (string | null)[];

interface TicTacToeBoardProps {
  board: Board;
  onCellClick: (position: number) => void;
  lastBotMove: number | null;
  isPlayerTurn: boolean;
  status: GameStatus;
}

export default function TicTacToeBoard({
  board,
  onCellClick,
  lastBotMove,
  isPlayerTurn,
  status,
}: TicTacToeBoardProps) {
  return (
    <div className={styles.board}>
      {board.map((cell, index) => (
        <button
          key={index}
          className={`${styles.cell} ${
            cell === 'X' ? styles.cellX : cell === 'O' ? styles.cellO : ''
          } ${lastBotMove === index ? styles.cellBotLast : ''}`}
          onClick={() => onCellClick(index)}
          disabled={!isPlayerTurn || status !== 'playing' || cell !== null}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}