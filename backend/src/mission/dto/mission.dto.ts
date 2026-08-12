import { ZodValidationPipe } from 'src/common/zod-validation-pipe';
import z from 'zod';

export const CreateMissionSchema = z.object({
  title: z.string(),
  description: z.string(),
  points: z.number(),
});

export type CreateMissionDto = z.infer<typeof CreateMissionSchema>;
export const CreateMissionPipe = new ZodValidationPipe(CreateMissionSchema);

export const UpdateMissionSchema = CreateMissionSchema.partial();

export type UpdateMissionDto = z.infer<typeof UpdateMissionSchema>;
export const UpdateMissionPipe = new ZodValidationPipe(UpdateMissionSchema);
