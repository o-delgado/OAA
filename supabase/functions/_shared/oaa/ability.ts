import type {
    AbilityCategory,
    AbilityEvaluationState,
    AbilityScore,
} from '../types/oaa/ability.ts';
import { getAbilityRank } from './rank.ts';

interface CreateAbilityScoreInput {
  category: AbilityCategory;
  score?: number | null;
  state?: AbilityEvaluationState;
  updatedAt?: string | null;
}

export function createAbilityScore({
  category,
  score = null,
  state = 'not_evaluated',
  updatedAt = null,
}: CreateAbilityScoreInput): AbilityScore {
  if (state !== 'evaluated') {
    return {
      category,
      score: null,
      rank: null,
      state,
      updatedAt,
    };
  }

  if (score === null) {
    throw new Error(
      'Evaluated abilities require a score.',
    );
  }

  return {
    category,
    score,
    rank: getAbilityRank(score),
    state: 'evaluated',
    updatedAt:
      updatedAt ?? new Date().toISOString(),
  };
}