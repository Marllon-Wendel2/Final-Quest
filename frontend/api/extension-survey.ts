import api from './client';
import { apiRequestWithRetry } from './retry';

export interface ExtensionSurveyRecord {
  id: string;
  userId: string;
  courseId: string;
  preSubmittedAt: string | null;
  ageRange: string | null;
  profileType: string | null;
  educationLevel: string | null;
  cityState: string | null;
  priorProgramming: boolean | null;
  preConfidence: number | null;
  expectation: string | null;
  consentAccepted: boolean;
  postSubmittedAt: string | null;
  postConfidence: number | null;
  gamificationRating: number | null;
  overallRating: number | null;
  difficulties: string | null;
  highlights: string | null;
  suggestions: string | null;
}

export interface MyExtensionSurveyResponse {
  courseId: string;
  preCompleted: boolean;
  postCompleted: boolean;
  survey: ExtensionSurveyRecord | null;
}

export interface PreSurveyPayload {
  courseId?: string;
  ageRange: string;
  profileType: string;
  educationLevel: string;
  cityState: string;
  priorProgramming: boolean;
  preConfidence: number;
  expectation?: string;
  consentAccepted: boolean;
}

export interface PostSurveyPayload {
  courseId?: string;
  postConfidence: number;
  gamificationRating: number;
  overallRating: number;
  difficulties?: string;
  highlights?: string;
  suggestions?: string;
}

export interface PostSurveySubmitResponse extends MyExtensionSurveyResponse {
  certificateGranted: boolean;
  certificados: string[];
}

export interface ExtensionReportResponse {
  courseId: string;
  generatedAt: string;
  summary: {
    totalParticipants: number;
    totalPostCompleted: number;
    totalCertified: number;
    totalAvailableLessons: number;
    avgCompletedLessons: number | null;
    completionRatePercent: number | null;
    certificationRatePercent: number | null;
    avgPreConfidence: number | null;
    avgPostConfidence: number | null;
    confidenceGain: number | null;
    confidenceGainPercent: number | null;
    avgGamificationRating: number | null;
    avgOverallRating: number | null;
    profileBreakdown: Record<string, number>;
    ageRangeBreakdown: Record<string, number>;
    educationBreakdown: Record<string, number>;
    cityBreakdown: Record<string, number>;
    priorProgrammingBreakdown: { yes: number; no: number };
  };
  responses: Array<{
    userId: string;
    name: string;
    email: string;
    points: number;
    hasCertificate: boolean;
    completedLessonsCount: number;
    ageRange: string | null;
    profileType: string | null;
    educationLevel: string | null;
    cityState: string | null;
    priorProgramming: boolean | null;
    preConfidence: number | null;
    expectation: string | null;
    preSubmittedAt: string | null;
    postConfidence: number | null;
    gamificationRating: number | null;
    overallRating: number | null;
    difficulties: string | null;
    highlights: string | null;
    suggestions: string | null;
    postSubmittedAt: string | null;
  }>;
}

export async function getMyExtensionSurvey(
  courseId = 'logicaGuanabara',
): Promise<MyExtensionSurveyResponse> {
  const { data } = await apiRequestWithRetry(() =>
    api.get('/extension-survey/me', { params: { courseId } }),
  );
  return data;
}

export async function submitPreSurvey(
  payload: PreSurveyPayload,
): Promise<MyExtensionSurveyResponse> {
  const { data } = await apiRequestWithRetry(() =>
    api.post('/extension-survey/pre', payload),
  );
  return data;
}

export async function submitPostSurvey(
  payload: PostSurveyPayload,
): Promise<PostSurveySubmitResponse> {
  const { data } = await apiRequestWithRetry(() =>
    api.post('/extension-survey/post', payload),
  );
  return data;
}

export async function getExtensionReport(
  courseId = 'logicaGuanabara',
): Promise<ExtensionReportResponse> {
  const { data } = await apiRequestWithRetry(() =>
    api.get('/extension-survey/report', { params: { courseId } }),
  );
  return data;
}
