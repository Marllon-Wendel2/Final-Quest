import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: '',
    timeout: 5000,
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
    const { data } = await api.get('/auth/me');
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
