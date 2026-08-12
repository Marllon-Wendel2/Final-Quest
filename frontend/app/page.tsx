'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AuthForm from './components/AuthForm';
import MissionsList from './components/MissionsList';
import { logout } from '../api/auth';
import { getMe, User } from '../api/client';
import './globals.css';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe().then((userData) => {
      setUser(userData);
      setLoading(false);
    });
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (loading) {
    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '1rem',
          position: 'relative',
        }}
      >
        <div className="starfield" />
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.7rem', color: 'var(--gold)', position: 'relative', zIndex: 1 }}>
          CARREGANDO...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '1rem',
          position: 'relative',
        }}
      >
        <div className="starfield" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '32rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Image
            src="/logoFinalQuestWithNoteBackground.png"
            alt="Final Quest"
            width={450}
            height={180}
            style={{
              maxWidth: '90vw',
              height: 'auto',
              margin: '0 auto 1.5rem auto',
              imageRendering: 'auto',
            }}
            priority
          />
          <AuthForm onLogin={handleLogin} />
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: '1rem', position: 'relative' }}>
      <div className="starfield" />
      <div style={{ maxWidth: '56rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <header className="rpg-header" style={{ marginBottom: '2rem' }}>
          <Image
            src="/logoFinalQuestWithNoteBackground.png"
            alt="Final Quest"
            width={150}
            height={60}
            style={{ height: 'auto', imageRendering: 'auto' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem', color: 'var(--text-white)' }}>
              Ola, {user.name}
            </span>
            <span className="rpg-badge">{user.points} pts</span>
            <button onClick={handleLogout} className="rpg-logout-btn">
              Sair
            </button>
          </div>
        </header>

        <MissionsList onMissionComplete={() => getMe().then(setUser)} />
      </div>
    </main>
  );
}
