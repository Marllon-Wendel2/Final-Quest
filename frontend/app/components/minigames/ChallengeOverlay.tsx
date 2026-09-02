'use client';

import { useState, useEffect, useCallback } from 'react';
import { AvailableMission, completeMission, getAvailableMissions } from '../../../api/player-mission';
import ChallengeRouter from './ChallengeRouter';
import { eventBus } from '../Phaser/core/EventBus';

export default function ChallengeOverlay() {
  const [missions, setMissions] = useState<AvailableMission[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<{
    missionId: string;
    challengeType: string;
    title: string;
    points: number;
  } | null>(null);

  const fetchMissions = useCallback(() => {
    getAvailableMissions().then(setMissions).catch(() => {});
  }, []);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  useEffect(() => {
    const handleAventureiraChallenge = (data?: { missionId?: string }) => {
      const mission = missions.find(
        (m) => m.id === data?.missionId || m.challengeType === 'TIC_TAC_TOE'
      );
      if (mission && mission.challengeType !== 'NONE') {
        setActiveChallenge({
          missionId: mission.id,
          challengeType: mission.challengeType,
          title: mission.title,
          points: mission.points,
        });
      }
    };

    const handleGhostChallenge = () => {
      const mission = missions.find(
        (m) => m.challengeType === 'MEMORY' && m.title === 'Desafie o Fantasma'
      );
      if (mission) {
        setActiveChallenge({
          missionId: mission.id,
          challengeType: mission.challengeType,
          title: mission.title,
          points: mission.points,
        });
      }
    };

    eventBus.on('aventureira:challenge', handleAventureiraChallenge);
    eventBus.on('ghost:challenge', handleGhostChallenge);
    return () => {
      eventBus.off('aventureira:challenge', handleAventureiraChallenge);
      eventBus.off('ghost:challenge', handleGhostChallenge);
    };
  }, [missions]);

  if (!activeChallenge) return null;

  return (
    <ChallengeRouter
      challengeType={activeChallenge.challengeType}
      missionId={activeChallenge.missionId}
      missionTitle={activeChallenge.title}
      points={activeChallenge.points}
      onSuccess={() => {
        const challenge = activeChallenge;
        setActiveChallenge(null);
        completeMission(challenge.missionId).catch(() => {}).finally(() => {
          fetchMissions();
          if (challenge.title === 'Desafie o Fantasma') {
            eventBus.emit('ghost:defeated');
          } else {
            eventBus.emit('aventureira:mission-complete');
          }
        });
      }}
      onClose={() => setActiveChallenge(null)}
    />
  );
}
