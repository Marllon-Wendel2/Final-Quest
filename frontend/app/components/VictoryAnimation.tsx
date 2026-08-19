'use client';

import { useAnimationPhase } from './animations/useAnimationPhase';
import { VICTORY_COLORS, VICTORY_SYMBOLS } from './animations/result-configs';
import ParticleEffect from './animations/ParticleEffect';
import ResultOverlay from './animations/ResultOverlay';

interface VictoryAnimationProps {
  points: number;
  missionTitle: string;
  onComplete?: () => void;
}

export default function VictoryAnimation({
  points,
  missionTitle,
  onComplete,
}: VictoryAnimationProps) {
  const { phase } = useAnimationPhase(undefined, onComplete);

  return (
    <ResultOverlay
      phase={phase}
      className="victory-overlay"
      overlayStyle={{
        background:
          'radial-gradient(ellipse at center, rgba(201, 168, 76, 0.12) 0%, rgba(13, 26, 13, 0.92) 60%, rgba(13, 26, 13, 0.97) 100%)',
      }}
    >
      <ParticleEffect colors={VICTORY_COLORS} symbols={VICTORY_SYMBOLS} />

      <div className={`victory-content ${phase === 'show' ? 'victory-content-show' : ''}`}>
        <div className="victory-sword-icon">⚔</div>
        <h1 className="victory-title">VITORIA!</h1>
        <div className="victory-divider">═══════════════</div>
        <p className="victory-subtitle">MISSãO COMPLETA!</p>
        <div className="victory-mission-name">{missionTitle}</div>
        <div className="victory-points">
          <span className="victory-points-icon">★</span>
          <span className="victory-points-value">+{points} PTS</span>
          <span className="victory-points-icon">★</span>
        </div>
        <div className="victory-divider">═══════════════</div>
      </div>
    </ResultOverlay>
  );
}
