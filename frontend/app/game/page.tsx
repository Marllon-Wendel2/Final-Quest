'use client';

import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('./PhaserGame'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '600px',
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '0.7rem',
      color: '#c9a84c',
    }}>
      Carregando jogo...
    </div>
  ),
});

export default function GamePage() {
  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      background: '#0d1a0d',
      zoom: 1.5,
    }}>
      <PhaserGame />
    </main>
  );
}
