import type {
    AbilityScore,
    OverallAbility,
} from './ability';

export interface OaaSnapshot {
  id: string;

  userId: string;

  overall: OverallAbility;

  academic: AbilityScore;

  physical: AbilityScore;

  adaptability: AbilityScore;

  socialContribution: AbilityScore;

  createdAt: string;
}