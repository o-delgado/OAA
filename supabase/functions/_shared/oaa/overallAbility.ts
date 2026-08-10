import type {
    AbilityEvaluationState,
    AbilityScore,
    OverallAbility,
} from '../types/oaa/ability.ts';
import { getAbilityRank } from './rank.ts';

interface OverallAbilityInput {
  academic: AbilityScore;
  physical: AbilityScore;
  adaptability: AbilityScore;
  socialContribution: AbilityScore;
}

function hasPendingVerification(
  abilities: AbilityScore[],
) {
  return abilities.some(
    (ability) =>
      ability.state === 'pending_verification',
  );
}

function hasNotEvaluatedAbility(
  abilities: AbilityScore[],
) {
  return abilities.some(
    (ability) =>
      ability.state === 'not_evaluated',
  );
}

function hasInsufficientData(
  abilities: AbilityScore[],
) {
  return abilities.some(
    (ability) =>
      ability.state === 'insufficient_data',
  );
}

function determineOverallState(
  abilities: AbilityScore[],
): AbilityEvaluationState {
  if (hasPendingVerification(abilities)) {
    return 'pending_verification';
  }

  if (hasNotEvaluatedAbility(abilities)) {
    return 'not_evaluated';
  }

  if (hasInsufficientData(abilities)) {
    return 'insufficient_data';
  }

  return 'evaluated';
}

export function calculateOverallAbility({
  academic,
  physical,
  adaptability,
  socialContribution,
}: OverallAbilityInput): OverallAbility {
  const abilities = [
    academic,
    physical,
    adaptability,
    socialContribution,
  ];

  const state = determineOverallState(
    abilities,
  );

  const allScoresAvailable = abilities.every(
    (ability) =>
      ability.state === 'evaluated' &&
      ability.score !== null,
  );

  if (!allScoresAvailable) {
    return {
      score: null,
      rank: null,
      state,

      academic,
      physical,
      adaptability,
      socialContribution,

      updatedAt: null,
    };
  }

  const academicScore = academic.score!;
  const physicalScore = physical.score!;
  const adaptabilityScore =
    adaptability.score!;

  const socialScore =
    socialContribution.score!;

  const score =
    (
      academicScore +
      adaptabilityScore +
      physicalScore +
      socialScore * 0.5
    ) /
    3.5;

  return {
    score,
    rank: getAbilityRank(score),
    state: 'evaluated',

    academic,
    physical,
    adaptability,
    socialContribution,

    updatedAt: new Date().toISOString(),
  };
}