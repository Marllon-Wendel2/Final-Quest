import api from "./client";

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  createdAt: string;
}

export async function getMissions(): Promise<Mission[]> {
    const { data } = await api.get('/mission');
    return data;
}