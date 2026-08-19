import styles from './TicTacToe.module.css';

interface TicTacToeStatusProps {
  text: string;
  color: string;
}

export default function TicTacToeStatus({ text, color }: TicTacToeStatusProps) {
  return (
    <div className={styles.status} style={{ color }}>
      {text}
    </div>
  );
}