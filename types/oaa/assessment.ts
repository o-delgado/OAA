import type { AbilityCategory } from './ability';

export type VerificationStatus =
  | 'draft'
  | 'pending'
  | 'verified'
  | 'rejected';

export type ScoreSourceType =
  | 'in_app_assessment'
  | 'real_world_result'
  | 'real_world_activity';

export interface ScoreSource {
  id: string;

  userId: string;

  category: AbilityCategory;

  sourceType: ScoreSourceType;

  rawScore: number | null;

  normalizedScore: number | null;

  verificationStatus: VerificationStatus;

  createdAt: string;

  verifiedAt: string | null;
}

export interface AssessmentResult {
  id: string;

  userId: string;

  assessmentId: string;

  category: AbilityCategory;

  score: number;

  startedAt: string;

  completedAt: string;

  createdAt: string;
}