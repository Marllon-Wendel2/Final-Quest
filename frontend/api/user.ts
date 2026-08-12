import api from "./client";

export interface RankedUser {
  id: string;
  name: string;
  points: number;
}

export async function getRankedUsers(limit: number = 10): Promise<RankedUser[]> {
    const { data } = await api.get(`/user/ranked?limit=${limit}`);
    return data;
}
