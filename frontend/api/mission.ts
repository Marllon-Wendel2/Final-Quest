import api from "./client";
import { apiRequestWithRetry } from "./retry";

export type Frequency = 'MINUTE' | 'HOUR' | 'DAILY' | 'WEEKLY' | 'ONCE';

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  frequency: Frequency;
  maxCompletions: number | null;
  createdAt: string;
}

export async function getMissions(): Promise<Mission[]> {
    const { data } = await apiRequestWithRetry(() => api.get('/mission'));
    return data;
}