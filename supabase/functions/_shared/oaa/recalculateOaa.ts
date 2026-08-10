import type { OverallAbility } from '../types/oaa/ability.ts';
import type { ScoreSource } from '../types/oaa/assessment.ts';
import { calculateOverallAbility } from './overallAbility.ts';
import { recalculateAbility } from './recalculateAbility.ts';

interface MinimumSourceRequirements {
  academic?: number;
  physical?: number;
  adaptability?: number;
  socialContribution?: number;
}

interface RecalculateOaaInput {
  sources: ScoreSource[];
  minimumSources?: MinimumSourceRequirements;
}

export function recalculateOaa({
  sources,
  minimumSources = {},
}: RecalculateOaaInput): OverallAbility {
  const academic = recalculateAbility({
    category: 'academic',
    sources,
    minimumRequiredSources:
      minimumSources.academic ?? 1,
  });

  const physical = recalculateAbility({
    category: 'physical',
    sources,
    minimumRequiredSources:
      minimumSources.physical ?? 1,
  });

  const adaptability = recalculateAbility({
    category: 'adaptability',
    sources,
    minimumRequiredSources:
      minimumSources.adaptability ?? 1,
  });

  const socialContribution =
    recalculateAbility({
      category: 'socialContribution',
      sources,
      minimumRequiredSources:
        minimumSources.socialContribution ?? 1,
    });

  return calculateOverallAbility({
    academic,
    physical,
    adaptability,
    socialContribution,
  });
}