import type { ScoreSource } from '@/types/oaa/assessment';
import { recalculateAbility } from '@/utils/oaa/recalculateAbility';

function createSource(
  overrides: Partial<ScoreSource> = {},
): ScoreSource {
  return {
    id: 'source-1',
    userId: 'user-1',
    category: 'academic',
    sourceType: 'in_app_assessment',
    rawScore: 80,
    normalizedScore: 80,
    verificationStatus: 'verified',
    createdAt: '2026-08-10T00:00:00.000Z',
    verifiedAt: '2026-08-10T00:00:00.000Z',
    ...overrides,
  };
}

describe('recalculateAbility', () => {
  it('calculates the average of verified sources', () => {
    const result = recalculateAbility({
      category: 'academic',
      sources: [
        createSource({
          id: '1',
          normalizedScore: 80,
        }),
        createSource({
          id: '2',
          normalizedScore: 90,
        }),
      ],
    });

    expect(result.state).toBe('evaluated');
    expect(result.score).toBe(85);
    expect(result.rank).toBe('A-');
  });

  it('ignores pending sources when enough verified data exists', () => {
    const result = recalculateAbility({
      category: 'academic',
      sources: [
        createSource({
          id: '1',
          normalizedScore: 70,
        }),
        createSource({
          id: '2',
          verificationStatus: 'pending',
          normalizedScore: 100,
          verifiedAt: null,
        }),
      ],
    });

    expect(result.state).toBe('evaluated');
    expect(result.score).toBe(70);
  });

  it('returns pending verification when no verified data exists but pending data does', () => {
    const result = recalculateAbility({
      category: 'academic',
      sources: [
        createSource({
          verificationStatus: 'pending',
          normalizedScore: null,
          verifiedAt: null,
        }),
      ],
    });

    expect(result.state).toBe(
      'pending_verification',
    );

    expect(result.score).toBeNull();
    expect(result.rank).toBeNull();
  });

  it('returns not evaluated when no sources exist', () => {
    const result = recalculateAbility({
      category: 'physical',
      sources: [],
    });

    expect(result.state).toBe(
      'not_evaluated',
    );

    expect(result.score).toBeNull();
  });

  it('returns insufficient data when verified sources are below the minimum', () => {
    const result = recalculateAbility({
      category: 'academic',
      sources: [
        createSource({
          normalizedScore: 80,
        }),
      ],
      minimumRequiredSources: 2,
    });

    expect(result.state).toBe(
      'insufficient_data',
    );

    expect(result.score).toBeNull();
  });

  it('ignores sources from other categories', () => {
    const result = recalculateAbility({
      category: 'academic',
      sources: [
        createSource({
          category: 'physical',
          normalizedScore: 100,
        }),
      ],
    });

    expect(result.state).toBe(
      'not_evaluated',
    );
  });

  it('ignores rejected sources', () => {
    const result = recalculateAbility({
      category: 'academic',
      sources: [
        createSource({
          verificationStatus: 'rejected',
          normalizedScore: 100,
          verifiedAt: null,
        }),
      ],
    });

    expect(result.state).toBe(
      'not_evaluated',
    );
  });

  it('preserves decimal precision when averaging', () => {
    const result = recalculateAbility({
      category: 'academic',
      sources: [
        createSource({
          id: '1',
          normalizedScore: 78.42,
        }),
        createSource({
          id: '2',
          normalizedScore: 81.17,
        }),
      ],
    });

    expect(result.score).toBeCloseTo(
      79.795,
      10,
    );
  });
});