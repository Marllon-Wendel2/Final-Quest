import api from "./client";
import { apiRequestWithRetry } from "./retry";

export interface PlayerMission {
  id: string;
  userId: string;
  missionId: string;
  completedAt: string;
  resetWindow: string;
  mission: {
    id: string;
    title: string;
    description: string;
    points: number;
  };
}

export interface AvailableMission {
  id: string;
  title: string;
  description: string;
  points: number;
  frequency: 'MINUTE' | 'HOUR' | 'DAILY' | 'WEEKLY' | 'ONCE';
  maxCompletions: number | null;
  createdAt: string;
  challengeType: 'NONE' | 'MEMORY' | 'TIC_TAC_TOE';  // ← NOVO

  isCompleted: boolean;
  completedAt: string | null;
  completionsCount: number;
  resetWindow: string;
  nextReset: {
    label: string;
    date: string;
  };
}

export async function completeMission(missionId: string): Promise<PlayerMission> {
    const { data } = await apiRequestWithRetry(() => api.post(`/player-missions/complete/${missionId}`));
    return data;
}

export async function getMyMissions(): Promise<PlayerMission[]> {
    const { data } = await apiRequestWithRetry(() => api.get('/player-missions/my-missions'));
    return data;
}

export async function getAvailableMissions(): Promise<AvailableMission[]> {
    const { data } = await apiRequestWithRetry(() => api.get('/player-missions/available'));
    return data;
}
