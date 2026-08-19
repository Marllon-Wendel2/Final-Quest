'use client';

import { ComponentType } from 'react';
import NoChallenge from './Nochallenge';
import TicTacToe from './TicTacToe/TicTacToe';
interface ChallengeProps {
  missionId: string;
  missionTitle: string;
  points: number;
  onSuccess: () => void;
  onClose: () => void;
}

const CHALLENGE_MAP: Record<string, ComponentType<ChallengeProps>> = {
  NONE: NoChallenge,
  TIC_TAC_TOE: TicTacToe,
  // MEMORY: MemoryGame,  // futuro
};

interface ChallengeRouterProps extends ChallengeProps {
  challengeType: string;
}

export default function ChallengeRouter({
  challengeType,
  ...props
}: ChallengeRouterProps) {
  const ChallengeComponent = CHALLENGE_MAP[challengeType];

  if (!ChallengeComponent) {
    console.warn(`Unknown challenge type: ${challengeType}`);
    return <NoChallenge {...props} />;
  }

  return <ChallengeComponent {...props} />;
}
