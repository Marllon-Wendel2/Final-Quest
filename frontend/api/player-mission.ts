import api from "./client";

export interface PlayerMission {
  id: string;
  userId: string;
  missionId: string;
  completedAt: string;
  mission: {
    id: string;
    title: string;
    description: string;
    points: number;
  };
}

export async function completeMission(missionId: string): Promise<PlayerMission> {
    const { data } = await api.post(`/player-missions/complete/${missionId}`);
    return data;
}

export async function getMyMissions(): Promise<PlayerMission[]> {
    const { data } = await api.get('/player-missions/my-missions');
    return data;
}
