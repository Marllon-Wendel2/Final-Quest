'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import AuthForm from './components/AuthForm';
import MissionsList from './components/MissionsList';
import RankingList from './components/RankingList';
import ServerWakeUpBanner from './components/ServerWakeUpBanner';
import { logout } from '../api/auth';
import { getMe, User } from '../api/client';
import './globals.css';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pointsAnimating, setPointsAnimating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const prevPointsRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    getMe().then((userData) => {
      setUser(userData);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = true;
    audio.volume = 0.2;

    const startAudio = () => {
      audio.muted = false;
      setIsMuted(false);
      audio.play().catch(() => {});
      document.removeEventListener('click', startAudio);
      document.removeEventListener('keydown', startAudio);
    };

    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('keydown', startAudio, { once: true });

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('keydown', startAudio);
    };
  }, []);

  useEffect(() => {
    if (user && prevPointsRef.current !== null && user.points > prevPointsRef.current) {
      setPointsAnimating(true);
      setTimeout(() => setPointsAnimating(false), 400);
    }
    if (user) {
      prevPointsRef.current = user.points;
    }
  }, [user]);

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
        <div className="battleground">
          <img src="/Battleground3.png" alt="" />
        </div>
        <ServerWakeUpBanner />
        <audio ref={audioRef} src="/Week 26 - Seaside CORAL REEF.ogg" loop autoPlay muted />
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.7rem', color: 'var(--gold)', position: 'relative', zIndex: 2 }}>
          CARREGANDO...
        </p>
        <button onClick={() => setIsMuted((m) => !m)} className="mute-btn">
          {isMuted ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
        </button>
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
        <div className="battleground">
          <img src="/Battleground3.png" alt="" />
        </div>
        <ServerWakeUpBanner />
        <audio ref={audioRef} src="/Week 26 - Seaside CORAL REEF.ogg" loop autoPlay muted />
        <button onClick={() => { const a = audioRef.current; if (a) { a.muted = !a.muted; setIsMuted(a.muted); } }} className="mute-btn">
          {isMuted ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
        </button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '32rem',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Image
            src="/novoLogo.png"
            alt="Final Quest"
            width={1050}
            height={420}
            className="login-logo"
            style={{
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
      <div className="battleground">
        <img src="/Battleground3.png" alt="" />
      </div>
      <ServerWakeUpBanner />
      <audio ref={audioRef} src="/Week 26 - Seaside CORAL REEF.ogg" loop autoPlay muted />
      <button onClick={() => { const a = audioRef.current; if (a) { a.muted = !a.muted; setIsMuted(a.muted); } }} className="mute-btn">
        {isMuted ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        )}
      </button>
      <div style={{ maxWidth: '56rem', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <header className="rpg-header" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Image
              src="/novoLogo.png"
              alt="Final Quest"
              width={720}
              height={288}
              className="header-logo"
              style={{ imageRendering: 'auto', flexShrink: 0 }}
            />
            <span className="header-greeting" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65rem', color: 'var(--text-white)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
              Olá, Sir. {user.name}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className={`rpg-badge header-badge ${pointsAnimating ? 'header-points-pop' : ''}`}>{user.points} pts</span>
            <button onClick={handleLogout} className="rpg-logout-btn header-logout">
              Sair
            </button>
          </div>
        </header>

        <MissionsList onMissionComplete={() => getMe().then(setUser)} bgAudioRef={audioRef} />

        <div style={{ marginTop: '2rem' }}>
          <RankingList />
        </div>
      </div>
    </main>
  );
}
