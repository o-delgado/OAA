import type { ScoreSource } from '@/types/oaa/assessment';
import { recalculateOaa } from '@/utils/oaa/recalculateOaa';

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

describe('recalculateOaa', () => {
  it('calculates all four abilities and overall ability', () => {
    const result = recalculateOaa({
      sources: [
        createSource({
          id: 'academic-1',
          category: 'academic',
          normalizedScore: 80,
        }),

        createSource({
          id: 'physical-1',
          category: 'physical',
          normalizedScore: 70,
        }),

        createSource({
          id: 'adaptability-1',
          category: 'adaptability',
          normalizedScore: 90,
        }),

        createSource({
          id: 'social-1',
          category: 'socialContribution',
          normalizedScore: 60,
        }),
      ],
    });

    expect(result.academic.score).toBe(80);
    expect(result.physical.score).toBe(70);
    expect(result.adaptability.score).toBe(90);
    expect(result.socialContribution.score).toBe(60);

    expect(result.state).toBe('evaluated');

    const expected =
      (80 + 90 + 70 + 60 * 0.5) / 3.5;

    expect(result.score).toBeCloseTo(
      expected,
      10,
    );
  });

  it('returns not evaluated when no sources exist', () => {
    const result = recalculateOaa({
      sources: [],
    });

    expect(result.academic.state).toBe(
      'not_evaluated',
    );

    expect(result.physical.state).toBe(
      'not_evaluated',
    );

    expect(result.adaptability.state).toBe(
      'not_evaluated',
    );

    expect(
      result.socialContribution.state,
    ).toBe('not_evaluated');

    expect(result.score).toBeNull();
    expect(result.rank).toBeNull();
    expect(result.state).toBe(
      'not_evaluated',
    );
  });

  it('does not calculate overall when one category lacks data', () => {
    const result = recalculateOaa({
      sources: [
        createSource({
          id: 'academic-1',
          category: 'academic',
          normalizedScore: 80,
        }),

        createSource({
          id: 'physical-1',
          category: 'physical',
          normalizedScore: 70,
        }),

        createSource({
          id: 'adaptability-1',
          category: 'adaptability',
          normalizedScore: 90,
        }),
      ],
    });

    expect(
      result.socialContribution.state,
    ).toBe('not_evaluated');

    expect(result.score).toBeNull();
    expect(result.rank).toBeNull();
  });

  it('propagates pending verification to overall state', () => {
    const result = recalculateOaa({
      sources: [
        createSource({
          id: 'academic-1',
          category: 'academic',
          normalizedScore: 80,
        }),

        createSource({
          id: 'physical-1',
          category: 'physical',
          normalizedScore: 70,
        }),

        createSource({
          id: 'adaptability-1',
          category: 'adaptability',
          normalizedScore: 90,
        }),

        createSource({
          id: 'social-1',
          category: 'socialContribution',
          normalizedScore: null,
          verificationStatus: 'pending',
          verifiedAt: null,
        }),
      ],
    });

    expect(
      result.socialContribution.state,
    ).toBe('pending_verification');

    expect(result.state).toBe(
      'pending_verification',
    );

    expect(result.score).toBeNull();
  });

  it('supports different minimum source requirements per category', () => {
    const result = recalculateOaa({
      sources: [
        createSource({
          id: 'academic-1',
          category: 'academic',
          normalizedScore: 80,
        }),

        createSource({
          id: 'physical-1',
          category: 'physical',
          normalizedScore: 70,
        }),

        createSource({
          id: 'adaptability-1',
          category: 'adaptability',
          normalizedScore: 90,
        }),

        createSource({
          id: 'social-1',
          category: 'socialContribution',
          normalizedScore: 60,
        }),
      ],

      minimumSources: {
        academic: 2,
        physical: 1,
        adaptability: 1,
        socialContribution: 1,
      },
    });

    expect(result.academic.state).toBe(
      'insufficient_data',
    );

    expect(result.score).toBeNull();
  });

  it('ignores rejected sources across the complete OAA calculation', () => {
    const result = recalculateOaa({
      sources: [
        createSource({
          id: 'academic-1',
          category: 'academic',
          normalizedScore: 80,
        }),

        createSource({
          id: 'physical-1',
          category: 'physical',
          normalizedScore: 70,
        }),

        createSource({
          id: 'adaptability-1',
          category: 'adaptability',
          normalizedScore: 90,
        }),

        createSource({
          id: 'social-rejected',
          category: 'socialContribution',
          normalizedScore: 100,
          verificationStatus: 'rejected',
          verifiedAt: null,
        }),
      ],
    });

    expect(
      result.socialContribution.state,
    ).toBe('not_evaluated');

    expect(
      result.socialContribution.score,
    ).toBeNull();

    expect(result.score).toBeNull();
  });

  it('preserves decimal precision through the full recalculation', () => {
    const result = recalculateOaa({
      sources: [
        createSource({
          id: 'academic-1',
          category: 'academic',
          normalizedScore: 78.42,
        }),

        createSource({
          id: 'physical-1',
          category: 'physical',
          normalizedScore: 67.38,
        }),

        createSource({
          id: 'adaptability-1',
          category: 'adaptability',
          normalizedScore: 81.17,
        }),

        createSource({
          id: 'social-1',
          category: 'socialContribution',
          normalizedScore: 59.73,
        }),
      ],
    });

    const expected =
      (
        78.42 +
        81.17 +
        67.38 +
        59.73 * 0.5
      ) /
      3.5;

    expect(result.score).toBeCloseTo(
      expected,
      10,
    );
  });
});