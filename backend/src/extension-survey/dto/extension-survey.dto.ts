import z from 'zod';
import { ZodValidationPipe } from '../../common/zod-validation-pipe';

export const PreCourseSurveySchema = z.object({
  courseId: z.string().min(1).default('logicaGuanabara'),
  ageRange: z.string().min(1, 'Informe sua faixa etária'),
  profileType: z.string().min(1, 'Informe seu perfil'),
  educationLevel: z.string().min(1, 'Informe sua escolaridade'),
  cityState: z.string().trim().min(2, 'Informe sua cidade/estado').max(120),
  priorProgramming: z.boolean(),
  preConfidence: z.number().int().min(1).max(5),
  expectation: z.string().trim().max(1000).optional().default(''),
  consentAccepted: z.boolean().refine((val) => val === true, {
    message: 'É necessário aceitar o termo de uso acadêmico',
  }),
});

export type PreCourseSurveyDto = z.infer<typeof PreCourseSurveySchema>;
export const PreCourseSurveyPipe = new ZodValidationPipe(PreCourseSurveySchema);

export const PostCourseSurveySchema = z.object({
  courseId: z.string().min(1).default('logicaGuanabara'),
  postConfidence: z.number().int().min(1).max(5),
  gamificationRating: z.number().int().min(1).max(5),
  overallRating: z.number().int().min(1).max(5),
  difficulties: z.string().trim().max(1500).optional().default(''),
  highlights: z.string().trim().max(1500).optional().default(''),
  suggestions: z.string().trim().max(1500).optional().default(''),
});

export type PostCourseSurveyDto = z.infer<typeof PostCourseSurveySchema>;
export const PostCourseSurveyPipe = new ZodValidationPipe(
  PostCourseSurveySchema,
);
