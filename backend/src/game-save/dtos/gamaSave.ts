import { ZodValidationPipe } from '../../common/zod-validation-pipe';
import z from 'zod';

const GameSaveSchema = z.object({
  type: z.string(),
  payload: z.any(),
});

export type CreateGameSaveDto = z.infer<typeof GameSaveSchema>;
export const CreateGameSavePipe = new ZodValidationPipe(GameSaveSchema);

export const UpdatedGameSaveSchema = GameSaveSchema.partial();
export type UpdateGameSaveDto = z.infer<typeof UpdatedGameSaveSchema>;
export const UpdateGameSavePipe = new ZodValidationPipe(UpdatedGameSaveSchema);
