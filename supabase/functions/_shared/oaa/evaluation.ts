import type {
    AbilityCategory,
    AbilityEvaluationState,
} from '../types/oaa/ability.ts';

interface DetermineEvaluationStateInput {
  category: AbilityCategory;
  validSources: number;
  pendingSources?: number;
  minimumRequiredSources?: number;
}

export function determineEvaluationState({
  validSources,
  pendingSources = 0,
  minimumRequiredSources = 1,
}: DetermineEvaluationStateInput): AbilityEvaluationState {
  if (
    !Number.isInteger(validSources) ||
    validSources < 0
  ) {
    throw new Error(
      'Valid sources must be a non-negative integer.',
    );
  }

  if (
    !Number.isInteger(pendingSources) ||
    pendingSources < 0
  ) {
    throw new Error(
      'Pending sources must be a non-negative integer.',
    );
  }

  if (
    !Number.isInteger(minimumRequiredSources) ||
    minimumRequiredSources <= 0
  ) {
    throw new Error(
      'Minimum required sources must be a positive integer.',
    );
  }

  if (validSources >= minimumRequiredSources) {
    return 'evaluated';
  }

  if (pendingSources > 0) {
    return 'pending_verification';
  }

  if (validSources === 0) {
    return 'not_evaluated';
  }

  return 'insufficient_data';
}