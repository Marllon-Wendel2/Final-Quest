import api from "./client";

interface UserResponse {
    id: string;
    name: string;
    email: string;
    points: number;
}

export async function login(email: string, password: string): Promise<UserResponse> {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function register(userData: {
  name: string;
  email: string;
  password: string;
}): Promise<UserResponse> {
  const { data } = await api.post('/auth/register', userData);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}
