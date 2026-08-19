import styles from './TicTacToe.module.css';

interface TicTacToeHeaderProps {
  missionTitle: string;
  onClose: () => void;
}

export default function TicTacToeHeader({ missionTitle, onClose }: TicTacToeHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>⚔️ JOGO DA VELHA</h2>
      <p className={styles.subtitle}>{missionTitle}</p>
      <button onClick={onClose} className={styles.close}>✕</button>
    </div>
  );
}