import { ZodValidationPipe } from '../../common/zod-validation-pipe';
import z from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export const CreateUserPipe = new ZodValidationPipe(CreateUserSchema);

export const UpdateUserSchema = CreateUserSchema.partial().extend({
  certificados: z.array(z.string()).optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export const UpdateUserPipe = new ZodValidationPipe(UpdateUserSchema);
