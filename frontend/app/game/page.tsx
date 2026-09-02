'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAuth } from '../contexts/AuthContext';
import ChallengeOverlay from '../components/minigames/ChallengeOverlay';

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
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
        background: '#0d1a0d',
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '0.7rem',
        color: '#c9a84c',
      }}>
        Verificando autenticação...
      </main>
    );
  }

  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '40vh',
      background: '#0d1a0d',
      position: 'relative',
    }}>
      <PhaserGame />
      <ChallengeOverlay />
    </main>
  );
}
