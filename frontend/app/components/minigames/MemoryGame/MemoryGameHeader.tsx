'use client';

import styles from './MemoryGame.module.css';

interface MemoryGameHeaderProps {
  missionTitle: string;
  onClose: () => void;
}

export default function MemoryGameHeader({ missionTitle, onClose }: MemoryGameHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{missionTitle}</h2>
      <p className={styles.subtitle}>JOGO DA MEMÓRIA</p>
      <button className={styles.close} onClick={onClose} aria-label="Fechar">
        ✕
      </button>
    </div>
  );
}