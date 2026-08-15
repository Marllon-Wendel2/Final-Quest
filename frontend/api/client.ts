import axios, { AxiosError } from "axios";
import { apiRequestWithRetry } from "./retry";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
}

export async function getMe(): Promise<User | null> {
  try {
    const { data } = await apiRequestWithRetry(() => api.get('/auth/me'));
    return data;
  } catch {
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default api;
