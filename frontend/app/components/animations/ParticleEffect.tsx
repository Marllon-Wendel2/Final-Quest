'use client';

import { useMemo } from 'react';

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

interface ParticleEffectProps {
  count?: number;
  colors: readonly string[];
  symbols: readonly string[];
}

function createParticles(
  count: number,
  colors: readonly string[],
  symbols: readonly string[],
): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
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

export default function ParticleEffect({
  count = 40,
  colors,
  symbols,
}: ParticleEffectProps) {
  const particles = useMemo(
    () => createParticles(count, colors, symbols),
    [count, colors, symbols],
  );

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle-effect"
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
    </>
  );
}
