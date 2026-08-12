import z from 'zod';

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  points: z.number().int().default(0),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const UserResponseSchema = AuthResponseSchema.omit({
  accessToken: true,
});
export type UserResponse = z.infer<typeof UserResponseSchema>;
