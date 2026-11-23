import { z } from 'zod';
import { ZodValidationPipe } from '../../common/zod-validation-pipe';

export const UpdateVideoLessonProgressSchema = z.object({
  answeredQuestions: z.array(z.string().min(1)).optional(),
  xpGranted: z.array(z.string().min(1)).optional(),
  bonusGranted: z.boolean().optional(),
  videoCompleted: z.boolean().optional(),
  missionCompleted: z.boolean().optional(),
});

export type UpdateVideoLessonProgressDto = z.infer<
  typeof UpdateVideoLessonProgressSchema
>;

export const UpdateVideoLessonProgressPipe = new ZodValidationPipe(
  UpdateVideoLessonProgressSchema,
);
