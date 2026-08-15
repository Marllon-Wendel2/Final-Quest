import { ZodValidationPipe } from 'src/common/zod-validation-pipe';
import z from 'zod';

const FrequencyEnum = z.enum(['MINUTE', 'HOUR', 'DAILY', 'WEEKLY', 'ONCE']);

export const CreateMissionSchema = z.object({
  title: z.string(),
  description: z.string(),
  points: z.number(),

  frequency: FrequencyEnum.default('ONCE'),
  resetWindow: z.string().optional(),
});

export type CreateMissionDto = z.infer<typeof CreateMissionSchema>;
export const CreateMissionPipe = new ZodValidationPipe(CreateMissionSchema);

export const UpdateMissionSchema = CreateMissionSchema.partial();

export type UpdateMissionDto = z.infer<typeof UpdateMissionSchema>;
export const UpdateMissionPipe = new ZodValidationPipe(UpdateMissionSchema);
