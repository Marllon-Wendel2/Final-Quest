'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AvailableMission, completeMission, getAvailableMissions } from '../../api/player-mission';
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

const FREQUENCY_CONFIG: Record<AvailableMission['frequency'], { label: string; color: string; icon: string }> = {
  MINUTE: { label: 'MINUTO', color: '#e74c3c', icon: '⚡' },
  HOUR: { label: 'HORA', color: '#e67e22', icon: '🕐' },
  DAILY: { label: 'DIARIA', color: '#27ae60', icon: '☀️' },
  WEEKLY: { label: 'SEMANAL', color: '#2980b9', icon: '🌙' },
  ONCE: { label: 'UNICA', color: '#8e44ad', icon: '⭐' },
};

function getTimeUntilNextReset(frequency: AvailableMission['frequency']): number {
  const now = new Date();

  switch (frequency) {
    case 'MINUTE': {
      const next = new Date(now);
      next.setSeconds(0, 0);
      next.setMinutes(next.getMinutes() + 1);
      return next.getTime() - now.getTime();
    }
    case 'HOUR': {
      const next = new Date(now);
      next.setMinutes(0, 0, 0);
      next.setHours(next.getHours() + 1);
      return next.getTime() - now.getTime();
    }
    default:
      return 0;
  }
}

export default function MissionsList({ onMissionComplete, bgAudioRef }: MissionsListProps) {
  const [missions, setMissions] = useState<AvailableMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [justCompletedId, setJustCompletedId] = useState<string | null>(null);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoints[]>([]);
  const [victoryData, setVictoryData] = useState<{ points: number; missionTitle: string } | null>(null);
  const [countdowns, setCountdowns] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const victorySfxRef = useRef<HTMLAudioElement>(null);
  const floatingIdCounter = useRef(0);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMissions = useCallback(() => {
    getAvailableMissions()
      .then((data) => {
        setMissions(data);
        const initial: Record<string, number> = {};
        for (const m of data) {
          if (m.isCompleted && (m.frequency === 'MINUTE' || m.frequency === 'HOUR')) {
            initial[m.id] = getTimeUntilNextReset(m.frequency);
          }
        }
        setCountdowns(initial);
      })
      .catch(() => setError('Erro ao carregar missões'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  // Countdown tick
  useEffect(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    countdownIntervalRef.current = setInterval(() => {
      setCountdowns((prev) => {
        const next: Record<string, number> = {};
        for (const [id, ms] of Object.entries(prev)) {
          next[id] = Math.max(0, ms - 1000);
        }
        return next;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  // Refresh missions when any countdown hits zero
  useEffect(() => {
    const hasZero = Object.values(countdowns).some((ms) => ms <= 0);
    if (hasZero) {
      fetchMissions();
    }
  }, [countdowns, fetchMissions]);

  const handleComplete = async (missionId: string, points: number, e: React.MouseEvent) => {
    setCompletingId(missionId);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      floatingIdCounter.current += 1;
      const newFloating: FloatingPoints = {
        id: `${missionId}-${floatingIdCounter.current}`,
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

      setMissions((prev) =>
        prev.map((m) =>
          m.id === missionId
            ? { ...m, isCompleted: true, completedAt: new Date().toISOString() }
            : m,
        ),
      );

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
      fetchMissions();
    } catch {
      setError('Erro ao completar missão');
    } finally {
      setCompletingId(null);
    }
  };

  const completedCount = missions.filter((m) => m.isCompleted).length;
  const totalCount = missions.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="quest-log"
      style={{
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

      {/* Quest Log Header */}
      <div className="quest-log-header">
        <div className="quest-log-title-row">
          <span className="quest-icon">📜</span>
          <h2 className="quest-log-title">REGISTO DE MISSÕES</h2>
          <span className="quest-icon">📜</span>
        </div>
        
        {/* Quest Progress Bar */}
        {!loading && totalCount > 0 && (
          <div className="quest-progress-container">
            <div className="quest-progress-bar">
              <div 
                className="quest-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
              <div className="quest-progress-shine" />
            </div>
            <div className="quest-progress-text">
              <span className="quest-star">★</span>
              <span>{completedCount} / {totalCount}</span>
              <span className="quest-star">★</span>
            </div>
          </div>
        )}
      </div>

      {/* Quest Log Content */}
      <div className="quest-log-content">
        {loading && (
          <div className="quest-loading">
            <span className="quest-loading-icon">⚔️</span>
            <p>CARREGANDO MISSÕES...</p>
          </div>
        )}

        {error && (
          <div className="quest-error">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && missions.length === 0 && (
          <div className="quest-empty">
            <span className="quest-empty-icon">📜</span>
            <p>Nenhuma missão disponível</p>
            <p className="quest-empty-sub">Volte mais tarde, aventureiro!</p>
          </div>
        )}

        {!loading && !error && missions.length > 0 && (
          <div className="quest-list">
            {missions.map((mission, index) => {
              const config = FREQUENCY_CONFIG[mission.frequency];
              const missionNumber = String(index + 1).padStart(2, '0');
              const countdown = countdowns[mission.id];
              const hasCountdown = mission.isCompleted && (mission.frequency === 'MINUTE' || mission.frequency === 'HOUR') && countdown !== undefined;
              
              return (
                <div
                  key={mission.id}
                  className={`quest-card ${justCompletedId === mission.id ? 'quest-card-completed' : ''} ${mission.isCompleted && !(mission.frequency === 'ONCE' && mission.maxCompletions && mission.completionsCount < mission.maxCompletions) ? 'quest-card-done' : ''}`}
                >
                  {/* Quest Number Badge */}
                  <div className="quest-number-badge">
                    <span className="quest-number">{missionNumber}</span>
                  </div>

                  {/* Quest Content */}
                  <div className="quest-card-content">
                    <div className="quest-card-header">
                      <h3 className="quest-card-title">{mission.title}</h3>
                      <div className="quest-card-meta">
                        <span className="quest-type-badge" style={{ borderColor: config.color, color: config.color }}>
                          {config.icon} {config.label}
                        </span>
                        <span className="quest-points">
                          <span className="quest-points-icon">💎</span>
                          {mission.points} PTS
                        </span>
                      </div>
                    </div>
                    
                    <p className="quest-card-description">{mission.description}</p>

                    {/* Quest Progress for ONCE missions with limit */}
                    {mission.frequency === 'ONCE' && mission.maxCompletions && (
                      <div className="quest-limit-bar">
                        <div className="quest-limit-progress">
                          <div 
                            className="quest-limit-fill"
                            style={{ width: `${(mission.completionsCount / mission.maxCompletions) * 100}%` }}
                          />
                        </div>
                        <span className="quest-limit-text">
                          {mission.completionsCount} / {mission.maxCompletions}
                        </span>
                      </div>
                    )}

                    {/* Quest Action */}
                    <div className="quest-card-action">
                      {(!mission.isCompleted || (mission.frequency === 'ONCE' && mission.maxCompletions && mission.completionsCount < mission.maxCompletions)) ? (
                        <button
                          onClick={(e) => handleComplete(mission.id, mission.points, e)}
                          disabled={completingId === mission.id}
                          className="quest-btn"
                        >
                          {completingId === mission.id ? (
                            <>
                              <span className="quest-btn-icon">⚔️</span>
                              AGUARDE...
                            </>
                          ) : (
                            <>
                              <span className="quest-btn-icon">🗡️</span>
                              COMPLETAR
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="quest-completed-badge">
                          <span className="quest-completed-icon">✓</span>
                          <span>CONCLUIDA</span>
                          {hasCountdown && (
                            <div className="quest-countdown">
                              <span className="quest-countdown-icon">⏳</span>
                              <span className="quest-countdown-value">
                                {String(Math.floor(Math.max(0, countdown) / 60000)).padStart(2, '0')}:{String(Math.floor((Math.max(0, countdown) % 60000) / 1000)).padStart(2, '0')}
                              </span>
                            </div>
                          )}
                          {!hasCountdown && mission.frequency !== 'ONCE' && (
                            <span className="quest-next-reset">
                              {mission.nextReset.label}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quest Completion Sparkle */}
                  {mission.isCompleted && !(mission.frequency === 'ONCE' && mission.maxCompletions && mission.completionsCount < mission.maxCompletions) && (
                    <div className="quest-sparkle">✦</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quest Log Footer */}
      <div className="quest-log-footer">
        <div className="quest-footer-decoration">❧ ❦ ❧</div>
      </div>

      {victoryData && (
        <VictoryAnimation
          points={victoryData.points}
          missionTitle={victoryData.missionTitle}
          onComplete={() => setVictoryData(null)}
        />
      )}
      <audio ref={victorySfxRef} src="/4. Ballad of Ashenwood.mp3" preload="auto" />

      <style jsx>{`
        .quest-log {
          background: linear-gradient(180deg, #1a1225 0%, #0d0a15 100%);
          border: 4px solid var(--gold);
          box-shadow:
            0 0 0 2px var(--parchment-dark),
            0 0 0 6px var(--gold-dark),
            0 0 30px rgba(247, 208, 96, 0.2),
            inset 0 0 50px rgba(0, 0, 0, 0.5);
          padding: 0;
        }

        .quest-log::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          bottom: 8px;
          border: 2px solid var(--gold-dark);
          pointer-events: none;
          opacity: 0.3;
        }

        .quest-log-header {
          background: linear-gradient(180deg, rgba(247, 208, 96, 0.15) 0%, transparent 100%);
          border-bottom: 3px solid var(--gold-dark);
          padding: 1rem 1.5rem;
        }

        .quest-log-title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .quest-icon {
          font-size: 1.2rem;
          animation: questIconPulse 2s ease-in-out infinite;
        }

        @keyframes questIconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .quest-log-title {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.85rem;
          color: var(--gold-bright);
          text-shadow:
            2px 2px 0 var(--parchment-dark),
            0 0 15px rgba(247, 208, 96, 0.6);
          letter-spacing: 3px;
          margin: 0;
        }

        .quest-progress-container {
          max-width: 300px;
          margin: 0 auto;
        }

        .quest-progress-bar {
          height: 20px;
          background: var(--bg-dark);
          border: 3px solid var(--gold-dark);
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .quest-progress-fill {
          height: 100%;
          background: linear-gradient(180deg, #4ade80 0%, #22c55e 50%, #16a34a 100%);
          transition: width 0.5s ease-out;
          position: relative;
        }

        .quest-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
        }

        .quest-progress-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: questShine 3s ease-in-out infinite;
        }

        @keyframes questShine {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        .quest-progress-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          font-family: 'Press Start 2P', monospace;
          font-size: 0.65rem;
          color: var(--gold);
        }

        .quest-star {
          color: var(--gold-bright);
          animation: questStarSpin 4s linear infinite;
        }

        @keyframes questStarSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .quest-log-content {
          padding: 1rem 1.5rem;
          min-height: 150px;
        }

        .quest-loading {
          text-align: center;
          padding: 2rem;
        }

        .quest-loading-icon {
          font-size: 2rem;
          animation: questLoadingSpin 1s linear infinite;
          display: inline-block;
        }

        @keyframes questLoadingSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .quest-loading p {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.6rem;
          color: var(--gold);
          margin-top: 1rem;
          animation: questLoadingPulse 1.5s ease-in-out infinite;
        }

        @keyframes questLoadingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .quest-error {
          text-align: center;
          padding: 1.5rem;
          background: rgba(204, 51, 51, 0.1);
          border: 2px solid var(--error-red);
        }

        .quest-error span {
          font-size: 1.5rem;
        }

        .quest-error p {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.55rem;
          color: #ff6b6b;
          margin-top: 0.5rem;
        }

        .quest-empty {
          text-align: center;
          padding: 2rem;
        }

        .quest-empty-icon {
          font-size: 3rem;
          opacity: 0.5;
        }

        .quest-empty p {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.6rem;
          color: var(--text-dim);
          margin-top: 1rem;
        }

        .quest-empty-sub {
          font-size: 0.5rem !important;
          opacity: 0.7;
        }

        .quest-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quest-card {
          display: flex;
          gap: 1rem;
          background: linear-gradient(135deg, rgba(26, 18, 37, 0.8) 0%, rgba(13, 10, 21, 0.9) 100%);
          border: 2px solid var(--gold-dark);
          padding: 1rem;
          position: relative;
          transition: all 0.3s ease;
        }

        .quest-card:hover {
          border-color: var(--gold);
          box-shadow: 0 0 15px rgba(247, 208, 96, 0.2);
        }

        .quest-card-done {
          opacity: 0.7;
        }

        .quest-card-done::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, transparent 100%);
          pointer-events: none;
        }

        .quest-number-badge {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, var(--gold) 0%, var(--gold-dark) 100%);
          border: 2px solid var(--parchment-dark);
          box-shadow: 2px 2px 0 var(--parchment-dark);
        }

        .quest-number {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.7rem;
          color: var(--parchment-dark);
          font-weight: bold;
        }

        .quest-card-content {
          flex: 1;
          min-width: 0;
        }

        .quest-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .quest-card-title {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.65rem;
          color: var(--gold);
          margin: 0;
          line-height: 1.4;
        }

        .quest-card-meta {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .quest-type-badge {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.45rem;
          border: 1px solid;
          padding: 0.2rem 0.4rem;
          white-space: nowrap;
        }

        .quest-points {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.5rem;
          color: var(--gold-bright);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .quest-points-icon {
          font-size: 0.7rem;
        }

        .quest-card-description {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.5rem;
          color: var(--text-dim);
          line-height: 1.8;
          margin: 0 0 0.75rem 0;
        }

        .quest-limit-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .quest-limit-progress {
          flex: 1;
          height: 8px;
          background: var(--bg-dark);
          border: 1px solid var(--gold-dark);
          overflow: hidden;
        }

        .quest-limit-fill {
          height: 100%;
          background: linear-gradient(180deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%);
          transition: width 0.3s ease;
        }

        .quest-limit-text {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.45rem;
          color: var(--text-dim);
          white-space: nowrap;
        }

        .quest-card-action {
          display: flex;
          align-items: center;
        }

        .quest-btn {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.5rem;
          background: linear-gradient(180deg, var(--btn-green) 0%, #1a4a1a 100%);
          color: var(--gold-bright);
          border: 2px solid var(--gold);
          padding: 0.5rem 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.1s;
          box-shadow:
            3px 3px 0 var(--parchment-dark),
            inset 0 -2px 0 rgba(0, 0, 0, 0.3);
        }

        .quest-btn:hover:not(:disabled) {
          background: linear-gradient(180deg, var(--btn-green-hover) 0%, #2a6a2a 100%);
          box-shadow:
            3px 3px 0 var(--parchment-dark),
            0 0 15px rgba(247, 208, 96, 0.3),
            inset 0 -2px 0 rgba(0, 0, 0, 0.3);
        }

        .quest-btn:active:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow:
            1px 1px 0 var(--parchment-dark),
            inset 0 -2px 0 rgba(0, 0, 0, 0.3);
        }

        .quest-btn:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .quest-btn-icon {
          font-size: 0.7rem;
        }

        .quest-completed-badge {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.5rem;
          color: var(--parchment-dark);
          background: linear-gradient(180deg, #4ade80 0%, #22c55e 100%);
          padding: 0.4rem 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 2px solid #16a34a;
          box-shadow: 2px 2px 0 var(--parchment-dark);
        }

        .quest-completed-icon {
          font-weight: bold;
          font-size: 0.7rem;
        }

        .quest-countdown {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-left: 0.5rem;
          padding-left: 0.5rem;
          border-left: 1px solid rgba(0, 0, 0, 0.3);
          animation: questCountdownPulse 1s ease-in-out infinite;
        }

        @keyframes questCountdownPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .quest-countdown-icon {
          font-size: 0.6rem;
        }

        .quest-countdown-value {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.55rem;
          color: var(--parchment-dark);
          font-weight: bold;
        }

        .quest-next-reset {
          font-size: 0.4rem;
          opacity: 0.8;
          margin-left: 0.5rem;
          padding-left: 0.5rem;
          border-left: 1px solid rgba(0, 0, 0, 0.3);
        }

        .quest-sparkle {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 1rem;
          color: var(--gold-bright);
          animation: questSparkle 2s ease-in-out infinite;
          text-shadow: 0 0 10px rgba(247, 208, 96, 0.8);
        }

        @keyframes questSparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .quest-log-footer {
          border-top: 2px solid var(--gold-dark);
          padding: 0.75rem;
          text-align: center;
        }

        .quest-footer-decoration {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.5rem;
          color: var(--gold-dark);
          opacity: 0.5;
          letter-spacing: 0.5rem;
        }
      `}</style>
    </div>
  );
}
