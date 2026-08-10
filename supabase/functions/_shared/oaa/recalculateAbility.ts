import type {
    AbilityCategory,
    AbilityScore,
} from '../types/oaa/ability.ts';
import type { ScoreSource } from '../types/oaa/assessment.ts';
import { createAbilityScore } from './ability.ts';
import { determineEvaluationState } from './evaluation.ts';

interface RecalculateAbilityInput {
  category: AbilityCategory;
  sources: ScoreSource[];
  minimumRequiredSources?: number;
}

export function recalculateAbility({
  category,
  sources,
  minimumRequiredSources = 1,
}: RecalculateAbilityInput): AbilityScore {
  const categorySources = sources.filter(
    (source) => source.category === category,
  );

  const verifiedSources = categorySources.filter(
    (source) =>
      source.verificationStatus === 'verified' &&
      source.normalizedScore !== null,
  );

  const pendingSources = categorySources.filter(
    (source) =>
      source.verificationStatus === 'pending',
  );

  const state = determineEvaluationState({
    category,
    validSources: verifiedSources.length,
    pendingSources: pendingSources.length,
    minimumRequiredSources,
  });

  if (state !== 'evaluated') {
    return createAbilityScore({
      category,
      state,
    });
  }

  const total = verifiedSources.reduce(
    (sum, source) =>
      sum + (source.normalizedScore ?? 0),
    0,
  );

  const score =
    total / verifiedSources.length;

  return createAbilityScore({
    category,
    score,
    state: 'evaluated',
  });
}