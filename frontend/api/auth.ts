import api from "./client";
import { apiRequestWithRetry } from "./retry";

interface UserResponse {
    id: string;
    name: string;
    email: string;
    points: number;
}

export async function login(email: string, password: string): Promise<UserResponse> {
  const { data } = await apiRequestWithRetry(() => api.post('/auth/login', { email, password }));
  return data;
}

export async function register(userData: {
  name: string;
  email: string;
  password: string;
}): Promise<UserResponse> {
  const { data } = await apiRequestWithRetry(() => api.post('/auth/register', userData));
  return data;
}

export async function logout(): Promise<void> {
  await apiRequestWithRetry(() => api.post('/auth/logout'));
}
