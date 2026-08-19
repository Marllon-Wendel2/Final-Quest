'use client';

import { useAnimationPhase } from './animations/useAnimationPhase';
import { RESULT_CONFIGS } from './animations/result-configs';
import ParticleEffect from './animations/ParticleEffect';
import ResultOverlay from './animations/ResultOverlay';

export type GameResult = 'won' | 'lost' | 'draw';

interface GameResultAnimationProps {
  result: GameResult;
  missionTitle: string;
  points: number;
  onComplete?: () => void;
}

export default function GameResultAnimation({
  result,
  missionTitle,
  points,
  onComplete,
}: GameResultAnimationProps) {
  const config = RESULT_CONFIGS[result];
  const { phase } = useAnimationPhase(undefined, onComplete);

  return (
    <ResultOverlay phase={phase}>
      <ParticleEffect colors={config.colors} symbols={config.symbols} />

      <div className={`result-content ${phase === 'show' ? 'result-content-show' : ''}`}>
        <div className="result-icon">{config.icon}</div>
        <h1
          className="result-title"
          style={{ color: config.colors[0], textShadow: `0 0 20px ${config.colors[0]}` }}
        >
          {config.title}
        </h1>
        <div className="result-divider">═══════════════</div>
        <p className="result-subtitle">{config.subtitle}</p>
        <div className="result-mission">{missionTitle}</div>
        {result === 'won' && (
          <div className="result-points">
            <span className="result-points-icon">★</span>
            <span className="result-points-value">+{points} PTS</span>
            <span className="result-points-icon">★</span>
          </div>
        )}
        <div className="result-divider">═══════════════</div>
      </div>
    </ResultOverlay>
  );
}
