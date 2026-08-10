import type {
    AbilityCategory,
    AbilityEvaluationState,
} from './ability';

export interface EvaluationDataStatus {
  category: AbilityCategory;

  validSources: number;

  pendingSources: number;

  minimumRequiredSources: number;

  state: AbilityEvaluationState;
}