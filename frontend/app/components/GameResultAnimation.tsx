'use client';

import { useEffect, useRef, useState } from 'react';

export type GameResult = 'won' | 'lost' | 'draw';

interface GameResultAnimationProps {
  result: GameResult;
  missionTitle: string;
  points: number;
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  symbol: string;
}

const RESULT_CONFIG = {
  won: {
    title: 'VITÓRIA!',
    subtitle: 'Missão Cumprida!',
    icon: '⚔',
    colors: ['#f7d060', '#ffe066', '#ffd700', '#ff8c00', '#ff6b35'],
    symbols: ['★', '✦', '♦', '◆', '✧', '⬥'],
  },
  lost: {
    title: 'DERROTA!',
    subtitle: 'Tente Novamente...',
    icon: '💀',
    colors: ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
    symbols: ['☠', '⚰', '✦', '◆', '♠', '♣'],
  },
  draw: {
    title: 'EMPATE!',
    subtitle: 'Nenhum Vencedor',
    icon: '⚖',
    colors: ['#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12'],
    symbols: ['⚖', '✦', '◆', '✧', '⬥', '♦'],
  },
};

function createParticles(count: number, colors: string[], symbols: string[]): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    size: 8 + Math.random() * 12,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.6,
    duration: 1.5 + Math.random() * 1.5,
    rotation: Math.random() * 360,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
  }));
}

export default function GameResultAnimation({
  result,
  missionTitle,
  points,
  onComplete,
}: GameResultAnimationProps) {
  const config = RESULT_CONFIG[result];
  const [particles] = useState(() => createParticles(40, config.colors, config.symbols));
  const [phase, setPhase] = useState<'enter' | 'show' | 'exit'>('enter');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase('show'), 100);
    const exitTimer = setTimeout(() => setPhase('exit'), 3000);
    const completeTimer = setTimeout(() => onCompleteRef.current?.(), 3800);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div
      className={`game-result-overlay ${phase === 'exit' ? 'game-result-exit' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="game-result-particle"
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            textShadow: `0 0 6px ${p.color}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.symbol}
        </span>
      ))}

      <div className={`game-result-content ${phase === 'show' ? 'game-result-content-show' : ''}`}>
        <div className="game-result-icon">{config.icon}</div>
        <h1
          className="game-result-title"
          style={{ color: config.colors[0], textShadow: `0 0 20px ${config.colors[0]}` }}
        >
          {config.title}
        </h1>
        <div className="game-result-divider">═══════════════</div>
        <p className="game-result-subtitle">{config.subtitle}</p>
        <div className="game-result-mission">{missionTitle}</div>
        {result === 'won' && (
          <div className="game-result-points">
            <span className="game-result-points-icon">★</span>
            <span className="game-result-points-value">+{points} PTS</span>
            <span className="game-result-points-icon">★</span>
          </div>
        )}
        <div className="game-result-divider">═══════════════</div>
      </div>

      <style jsx>{`
        .game-result-overlay {
          background: rgba(0, 0, 0, 0.9);
          animation: gameResultFadeIn 0.3s ease-out;
        }

        .game-result-exit {
          animation: gameResultFadeOut 0.5s ease-in forwards;
        }

        @keyframes gameResultFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gameResultFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .game-result-particle {
          animation: gameResultFall linear forwards;
        }

        @keyframes gameResultFall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }

        .game-result-content {
          text-align: center;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 1;
        }

        .game-result-content-show {
          opacity: 1;
          transform: scale(1);
        }

        .game-result-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: gameResultIconPulse 1s ease-in-out infinite;
        }

        @keyframes gameResultIconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .game-result-title {
          font-family: 'Press Start 2P', monospace;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
          letter-spacing: 4px;
        }

        .game-result-divider {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.6rem;
          color: var(--gold-dark);
          margin: 0.5rem 0;
          letter-spacing: 2px;
        }

        .game-result-subtitle {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.7rem;
          color: var(--text-dim);
          margin: 0 0 1rem 0;
        }

        .game-result-mission {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.55rem;
          color: var(--gold);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .game-result-points {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-family: 'Press Start 2P', monospace;
          font-size: 1rem;
          color: var(--gold-bright);
          margin-bottom: 0.5rem;
        }

        .game-result-points-icon {
          font-size: 1.2rem;
          animation: gameResultStarSpin 2s linear infinite;
        }

        @keyframes gameResultStarSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .game-result-points-value {
          text-shadow: 0 0 15px var(--gold-bright);
        }

        @media (max-width: 480px) {
          .game-result-title {
            font-size: 1.2rem;
          }

          .game-result-icon {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
