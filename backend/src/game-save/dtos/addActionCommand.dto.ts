import { ZodValidationPipe } from '../../common/zod-validation-pipe';
import { z } from 'zod';

export const GameActionTypes = [
  'PLAYER_MOVED',
  'ITEM_COLLECTED',
  'ITEM_USED',
  'DIALOGUE_COMPLETED',
  'GHOST_ENCOUNTERED',
  'ADVENTURER_TALKED',
  'MISSION_STARTED',
  'MISSION_PROGRESS',
  'MISSION_COMPLETED',
  'FLAG_SET',
  'MINIGAME_RESULT',
] as const;

export const AddActionCommandSchema = z.object({
  type: z.enum(GameActionTypes, {
    message: 'Tipo de ação inválido',
  }),
  payload: z.record(z.string(), z.unknown()).default({}),
});

export type AddActionCommandDto = z.infer<typeof AddActionCommandSchema>;
export const AddActionCommandPipe = new ZodValidationPipe(
  AddActionCommandSchema,
);
