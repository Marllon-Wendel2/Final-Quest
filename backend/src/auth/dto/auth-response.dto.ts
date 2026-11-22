import z from 'zod';

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  points: z.number().int().default(0),
  certificados: z.array(z.string()).default([]),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const UserResponseSchema = AuthResponseSchema.omit({
  accessToken: true,
});
export type UserResponse = z.infer<typeof UserResponseSchema>;
