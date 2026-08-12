'use client';

import { useState, useEffect } from 'react';
import { getMissions, Mission } from '../../api/mission';
import { completeMission, getMyMissions, PlayerMission } from '../../api/player-mission';

interface MissionsListProps {
  onMissionComplete?: () => void;
}

export default function MissionsList({ onMissionComplete }: MissionsListProps) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completingId, setCompletingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getMissions(), getMyMissions()])
      .then(([missionsData, playerMissions]) => {
        setMissions(missionsData);
        const completedIds = new Set(playerMissions.map((pm: PlayerMission) => pm.missionId));
        setCompletedMissions(completedIds);
      })
      .catch(() => setError('Erro ao carregar missoes'))
      .finally(() => setLoading(false));
  }, []);

  const handleComplete = async (missionId: string) => {
    setCompletingId(missionId);
    try {
      await completeMission(missionId);
      setCompletedMissions((prev) => new Set([...prev, missionId]));
      onMissionComplete?.();
    } catch {
      setError('Erro ao completar missao');
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--parchment) 0%, var(--parchment-dark) 100%)',
        border: '3px solid var(--gold-dark)',
        boxShadow: '4px 4px 0 var(--parchment-dark)',
        padding: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.85rem', color: 'var(--gold)', margin: 0 }}>
          Missoes
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
          Suas missoes aparecerao aqui em breve...
        </p>
      )}

      {!loading && !error && missions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {missions.map((mission) => {
            const isCompleted = completedMissions.has(mission.id);
            return (
              <div
                key={mission.id}
                style={{
                  background: isCompleted
                    ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, var(--parchment-dark) 100%)'
                    : 'var(--parchment-dark)',
                  border: `2px solid ${isCompleted ? 'var(--gold)' : 'var(--gold-dark)'}`,
                  padding: '1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.7rem', color: 'var(--gold)', margin: 0 }}>
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
                    onClick={() => handleComplete(mission.id)}
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
    </div>
  );
}
