'use client';

import { useEffect, useRef, useState } from 'react';

interface VictoryAnimationProps {
  points: number;
  missionTitle: string;
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

const SYMBOLS = ['★', '✦', '♦', '◆', '✧', '⬥', '♠', '♣'];
const COLORS = ['#f7d060', '#ffe066', '#ffd700', '#ff8c00', '#ff6b35', '#ff4444', '#e74c3c'];

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    size: 8 + Math.random() * 12,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 0.6,
    duration: 1.5 + Math.random() * 1.5,
    rotation: Math.random() * 360,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
  }));
}

export default function VictoryAnimation({ points, missionTitle, onComplete }: VictoryAnimationProps) {
  const [particles] = useState(() => createParticles(40));
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
      className={`victory-overlay ${phase === 'exit' ? 'victory-exit' : ''}`}
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
          className="victory-particle"
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
    </div>
  );
}
