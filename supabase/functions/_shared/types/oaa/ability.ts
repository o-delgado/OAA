import type { AbilityRank } from './rank.ts';

export type AbilityCategory =
  | 'academic'
  | 'physical'
  | 'adaptability'
  | 'socialContribution';

export type AbilityEvaluationState =
  | 'not_evaluated'
  | 'insufficient_data'
  | 'pending_verification'
  | 'evaluated';

export interface AbilityScore {
  category: AbilityCategory;

  score: number | null;

  rank: AbilityRank | null;

  state: AbilityEvaluationState;

  updatedAt: string | null;
}

export interface OverallAbility {
  score: number | null;

  rank: string | null;

  state: AbilityEvaluationState;

  academic: AbilityScore;
  physical: AbilityScore;
  adaptability: AbilityScore;
  socialContribution: AbilityScore;

  updatedAt: string | null;
}