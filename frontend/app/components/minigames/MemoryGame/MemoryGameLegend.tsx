'use client';

import styles from './MemoryGame.module.css';

const LEGEND_ITEMS = [
  { icon: '💣', title: 'Bomba', description: 'Perde 2 segundos' },
  { icon: '⭐', title: 'Estrela', description: 'Próxima jogada grátis' },
  { icon: '·', title: 'Carta Vazia', description: 'Tentativa errada' },
];

export default function MemoryGameLegend() {
  return (
    <div className={styles.legend}>
      <span className={styles.legendTitle}>LEGENDA</span>
      <div className={styles.legendItems}>
        {LEGEND_ITEMS.map((item) => (
          <div key={item.title} className={styles.legendItem}>
            <span className={styles.legendIcon}>{item.icon}</span>
            <div className={styles.legendTexts}>
              <span className={styles.legendItemTitle}>{item.title}</span>
              <span className={styles.legendItemDesc}>{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
