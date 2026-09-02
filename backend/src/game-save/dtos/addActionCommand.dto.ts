import { z } from 'zod';
import { ZodValidationPipe } from '../../common/zod-validation-pipe';

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
  'TEAM_UPDATED',
  'ADVENTURER_MOVED',
  'ADVENTURER_FEMALE_MOVED',
] as const;

export type GameActionType = (typeof GameActionTypes)[number];

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
