'use client';

import { useState, useEffect, useRef } from 'react';
import { getRankedUsers, RankedUser } from '../../api/user';
import { getSocket } from '../../api/socket';

interface FloatingPoints {
  id: string;
  points: number;
  x: number;
  y: number;
}

export default function RankingList() {
  const [players, setPlayers] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [limit, setLimit] = useState(10);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoints[]>([]);
  const [changedPositions, setChangedPositions] = useState<Set<string>>(new Set());
  const prevPlayersRef = useRef<Map<string, { points: number; position: number }>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const processNewRanking = (newPlayers: RankedUser[]) => {
    const prevMap = prevPlayersRef.current;
    const newChangedPositions = new Set<string>();
    const newFloating: FloatingPoints[] = [];

    if (prevMap.size > 0 && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      newPlayers.forEach((player, newIndex) => {
        const newPosition = newIndex + 1;
        const prev = prevMap.get(player.id);

        if (prev) {
          if (player.points > prev.points) {
            const pointsDiff = player.points - prev.points;
            const rowEl = containerRef.current?.querySelector(`[data-player-id="${player.id}"]`);
            if (rowEl) {
              const rect = rowEl.getBoundingClientRect();
              newFloating.push({
                id: `${player.id}-${Date.now()}`,
                points: pointsDiff,
                x: rect.right - containerRect.left - 40,
                y: rect.top - containerRect.top,
              });
            }
          }

          if (prev.position !== newPosition) {
            newChangedPositions.add(player.id);
          }
        }
      });
    }

    if (newFloating.length > 0) {
      setFloatingPoints((prev) => [...prev, ...newFloating]);
      newFloating.forEach((fp) => {
        setTimeout(() => {
          setFloatingPoints((prev) => prev.filter((f) => f.id !== fp.id));
        }, 1200);
      });
    }

    if (newChangedPositions.size > 0) {
      setChangedPositions(newChangedPositions);
      setTimeout(() => setChangedPositions(new Set()), 600);
    }

    const newMap = new Map<string, { points: number; position: number }>();
    newPlayers.forEach((player, index) => {
      newMap.set(player.id, { points: player.points, position: index + 1 });
    });
    prevPlayersRef.current = newMap;

    setPlayers(newPlayers);
  };

  useEffect(() => {
    setLoading(true);
    getRankedUsers(limit)
      .then(processNewRanking)
      .catch(() => setError('Erro ao carregar ranking'))
      .finally(() => setLoading(false));

    const socket = getSocket();

    const handleRankingUpdated = () => {
      getRankedUsers(limit)
        .then(processNewRanking)
        .catch(() => setError('Erro ao atualizar ranking'));
    };

    socket.on('ranking-updated', handleRankingUpdated);

    return () => {
      socket.off('ranking-updated', handleRankingUpdated);
    };
  }, [limit]);

  const getMedal = (position: number) => {
    if (position === 1) return { color: '#FFD700', label: '1º' };
    if (position === 2) return { color: '#C0C0C0', label: '2º' };
    if (position === 3) return { color: '#CD7F32', label: '3º' };
    return { color: 'var(--text-dim)', label: `${position}º` };
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
          Ranking
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[10, 20, 50].map((value) => (
            <button
              key={value}
              onClick={() => setLimit(value)}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.5rem',
                background: limit === value ? 'var(--gold)' : 'var(--gold-dark)',
                color: 'var(--parchment)',
                border: 'none',
                padding: '0.4rem 0.6rem',
                cursor: 'pointer',
              }}
            >
              {value}
            </button>
          ))}
        </div>
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

      {!loading && !error && players.length === 0 && (
        <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem', color: 'var(--text-dim)', lineHeight: 1.8 }}>
          Nenhum jogador encontrado...
        </p>
      )}

      {!loading && !error && players.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {players.map((player, index) => {
            const position = index + 1;
            const medal = getMedal(position);
            const isTop3 = position <= 3;
            return (
              <div
                key={player.id}
                data-player-id={player.id}
                className={changedPositions.has(player.id) ? 'ranking-position-changed' : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: isTop3
                    ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, var(--parchment-dark) 100%)'
                    : 'var(--parchment-dark)',
                  border: `2px solid ${isTop3 ? medal.color : 'var(--gold-dark)'}`,
                  padding: '0.75rem 1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '0.7rem',
                    color: medal.color,
                    minWidth: '2.5rem',
                    textAlign: 'center',
                  }}
                >
                  {medal.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: isTop3 ? '0.65rem' : '0.55rem',
                    color: isTop3 ? 'var(--gold)' : 'var(--text-white)',
                    flex: 1,
                  }}
                >
                  {player.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '0.6rem',
                    color: 'var(--gold)',
                  }}
                >
                  {player.points} pts
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}