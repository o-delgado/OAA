import type { AbilityRank } from '@/types/oaa/rank';

export function getAbilityRank(
  score: number,
): AbilityRank {
  if (!Number.isFinite(score)) {
    throw new Error('Score must be a finite number.');
  }

  if (score < 0 || score > 100) {
    throw new Error(
      'Score must be between 0 and 100.',
    );
  }

  if (score >= 96) return 'A+';
  if (score >= 86) return 'A';
  if (score >= 81) return 'A-';

  if (score >= 76) return 'B+';
  if (score >= 66) return 'B';
  if (score >= 61) return 'B-';

  if (score >= 56) return 'C+';
  if (score >= 46) return 'C';
  if (score >= 41) return 'C-';

  if (score >= 36) return 'D+';
  if (score >= 26) return 'D';
  if (score >= 21) return 'D-';

  if (score >= 16) return 'E+';
  if (score >= 6) return 'E';
  if (score >= 1) return 'E-';

  return 'F';
}