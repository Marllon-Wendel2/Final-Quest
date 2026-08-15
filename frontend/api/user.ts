import api from "./client";
import { apiRequestWithRetry } from "./retry";

export interface RankedUser {
  id: string;
  name: string;
  points: number;
}

export async function getRankedUsers(limit: number = 10): Promise<RankedUser[]> {
    const { data } = await apiRequestWithRetry(() => api.get(`/user/ranked?limit=${limit}`));
    return data;
}
