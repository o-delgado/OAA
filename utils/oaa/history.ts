import type { OverallAbility } from '@/types/oaa/ability';
import type { OaaSnapshot } from '@/types/oaa/history';

interface CreateOaaSnapshotInput {
  id: string;
  userId: string;
  overall: OverallAbility;
  createdAt?: string;
}

export function createOaaSnapshot({
  id,
  userId,
  overall,
  createdAt = new Date().toISOString(),
}: CreateOaaSnapshotInput): OaaSnapshot {
  return {
    id,
    userId,

    overall,

    academic: overall.academic,
    physical: overall.physical,
    adaptability: overall.adaptability,
    socialContribution:
      overall.socialContribution,

    createdAt,
  };
}

export function hasOaaChanged(
  previous: OverallAbility | null,
  current: OverallAbility,
): boolean {
  if (!previous) {
    return true;
  }

  return (
    previous.score !== current.score ||
    previous.rank !== current.rank ||
    previous.state !== current.state ||

    previous.academic.score !==
      current.academic.score ||
    previous.academic.rank !==
      current.academic.rank ||
    previous.academic.state !==
      current.academic.state ||

    previous.physical.score !==
      current.physical.score ||
    previous.physical.rank !==
      current.physical.rank ||
    previous.physical.state !==
      current.physical.state ||

    previous.adaptability.score !==
      current.adaptability.score ||
    previous.adaptability.rank !==
      current.adaptability.rank ||
    previous.adaptability.state !==
      current.adaptability.state ||

    previous.socialContribution.score !==
      current.socialContribution.score ||
    previous.socialContribution.rank !==
      current.socialContribution.rank ||
    previous.socialContribution.state !==
      current.socialContribution.state
  );
}