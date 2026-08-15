'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getMissions, Mission } from '../../api/mission';
import { completeMission, getMyMissions, PlayerMission } from '../../api/player-mission';
import VictoryAnimation from './VictoryAnimation';

interface MissionsListProps {
  onMissionComplete?: () => void;
  bgAudioRef?: React.RefObject<HTMLAudioElement | null>;
}

interface FloatingPoints {
  id: string;
  points: number;
  x: number;
  y: number;
}

export default function MissionsList({ onMissionComplete, bgAudioRef }: MissionsListProps) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [justCompletedId, setJustCompletedId] = useState<string | null>(null);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoints[]>([]);
  const [victoryData, setVictoryData] = useState<{ points: number; missionTitle: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const victorySfxRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    Promise.all([getMissions(), getMyMissions()])
      .then(([missionsData, playerMissions]) => {
        setMissions(missionsData);
        const completedIds = new Set(playerMissions.map((pm: PlayerMission) => pm.missionId));
        setCompletedMissions(completedIds);
      })
      .catch(() => setError('Erro ao carregar missões'))
      .finally(() => setLoading(false));
  }, []);

  const handleComplete = async (missionId: string, points: number, e: React.MouseEvent) => {
    setCompletingId(missionId);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    if (containerRect) {
      const newFloating: FloatingPoints = {
        id: `${missionId}-${Date.now()}`,
        points,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top,
      };
      setFloatingPoints((prev) => [...prev, newFloating]);
      
      setTimeout(() => {
        setFloatingPoints((prev) => prev.filter((fp) => fp.id !== newFloating.id));
      }, 1200);
    }

    try {
      await completeMission(missionId);
      setCompletedMissions((prev) => new Set([...prev, missionId]));
      setJustCompletedId(missionId);
      setTimeout(() => setJustCompletedId(null), 1000);

      const completedMission = missions.find((m) => m.id === missionId);
      if (completedMission) {
        setVictoryData({ points: completedMission.points, missionTitle: completedMission.title });
        const sfx = victorySfxRef.current;
        if (sfx) {
          sfx.currentTime = 0;
          sfx.volume = 0.5;
          sfx.play().catch(() => {});

          const bg = bgAudioRef?.current;
          if (bg) bg.pause();

          setTimeout(() => {
            sfx.pause();
            sfx.currentTime = 0;
            if (bg) bg.play().catch(() => {});
          }, 6000);
        }
      }

      onMissionComplete?.();
    } catch {
      setError('Erro ao completar missao');
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        background: 'linear-gradient(135deg, var(--parchment) 0%, var(--parchment-dark) 100%)',
        border: '3px solid var(--gold-dark)',
        boxShadow: '4px 4px 0 var(--parchment-dark)',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {floatingPoints.map((fp) => (
        <span
          key={fp.id}
          className="floating-points"
          style={{ left: fp.x, top: fp.y }}
        >
          +{fp.points}
        </span>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.85rem', color: 'var(--gold)', margin: 0 }}>
          Missões
        </h2>
        {!loading && missions.length > 0 && (
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.55rem', color: 'var(--gold)' }}>
            {completedMissions.size}/{missions.length}
          </span>
        )}
      </div>

      {loading && (
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem', color: 'var(--gold)', lineHeight: 1.8 }}>
          CARREGANDO...
        </p>
      )}

      {error && (
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem', color: '#e74c3c', lineHeight: 1.8 }}>
          {error}
        </p>
      )}

      {!loading && !error && missions.length === 0 && (
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem', color: 'var(--text-dim)', lineHeight: 1.8 }}>
          Suas missões aparecerao aqui em breve...
        </p>
      )}

      {!loading && !error && missions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {missions.map((mission) => {
            const isCompleted = completedMissions.has(mission.id);
            return (
              <div
                key={mission.id}
                className={justCompletedId === mission.id ? 'mission-just-completed' : ''}
                style={{
                  background: isCompleted
                    ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, var(--parchment-dark) 100%)'
                    : 'var(--parchment-dark)',
                  border: `2px solid ${isCompleted ? 'var(--gold)' : 'var(--gold-dark)'}`,
                  padding: '1rem',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.7rem', color: 'var(--gold)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                    {mission.title}
                  </h3>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem', color: 'var(--gold)' }}>
                    {mission.points} pts
                  </span>
                </div>
                <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.55rem', color: 'var(--text-dim)', lineHeight: 1.8, margin: '0 0 0.75rem 0' }}>
                  {mission.description}
                </p>
                {!isCompleted ? (
                  <button
                    onClick={(e) => handleComplete(mission.id, mission.points, e)}
                    disabled={completingId === mission.id}
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '0.55rem',
                      background: 'var(--gold-dark)',
                      color: 'var(--parchment)',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      cursor: completingId === mission.id ? 'wait' : 'pointer',
                    }}
                  >
                    {completingId === mission.id ? 'AGUARDE...' : 'COMPLETAR'}
                  </button>
                ) : (
                  <span
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '0.55rem',
                      color: 'var(--parchment)',
                      background: 'var(--gold)',
                      padding: '0.4rem 0.8rem',
                      display: 'inline-block',
                    }}
                  >
                    ✦ CONCLUIDA ✦
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      {victoryData && (
        <VictoryAnimation
          points={victoryData.points}
          missionTitle={victoryData.missionTitle}
          onComplete={() => setVictoryData(null)}
        />
      )}
      <audio ref={victorySfxRef} src="/4. Ballad of Ashenwood.mp3" preload="auto" />
    </div>
  );
}
