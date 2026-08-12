import { ZodValidationPipe } from 'src/common/zod-validation-pipe';
import z from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export const CreateUserPipe = new ZodValidationPipe(CreateUserSchema);

export const UpdateUserSchema = CreateUserSchema.partial();
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export const UpdateUserPipe = new ZodValidationPipe(UpdateUserSchema);
