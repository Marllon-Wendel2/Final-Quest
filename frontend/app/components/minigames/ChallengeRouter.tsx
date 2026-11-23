'use client';

import { ComponentType } from 'react';
import NoChallenge from './Nochallenge';
import TicTacToe from './TicTacToe/TicTacToe';
import MemoryGame from './MemoryGame/MemoryGame';
import VideoLesson from './VideoLesson/VideoLesson';
import type { VideoLessonProgress } from '../../../api/player-mission';

interface ChallengeProps {
  missionId: string;
  missionTitle: string;
  points: number;
  isCompleted?: boolean;
  initialLessonProgress?: VideoLessonProgress;
  onLessonProgressChange?: (progress: VideoLessonProgress) => void;
  onSuccess: () => void;
  onClose: () => void;
}

const CHALLENGE_MAP: Record<string, ComponentType<ChallengeProps>> = {
  NONE: NoChallenge,
  TIC_TAC_TOE: TicTacToe,
  MEMORY: MemoryGame,
  VIDEO_LESSON: VideoLesson,
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
