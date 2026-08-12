import z from 'zod';

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  points: z.number().int().default(0),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
