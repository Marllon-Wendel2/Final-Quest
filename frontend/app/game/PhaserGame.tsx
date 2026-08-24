'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { createGameConfig } from './config';

export default function PhaserGame() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !gameRef.current) {
      gameRef.current = new Phaser.Game(createGameConfig('phaser-container'));
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="phaser-container"
      ref={containerRef}
      style={{ width: 'auto', height: 'auto', margin: '0 auto', imageRendering: 'pixelated' }}
    />
  );
}
