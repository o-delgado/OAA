import { createAbilityScore } from '@/utils/oaa/ability';
import { calculateOverallAbility } from '@/utils/oaa/overallAbility';

describe('calculateOverallAbility', () => {
  it('calculates the overall score correctly', () => {
    const academic = createAbilityScore({
      category: 'academic',
      score: 80,
      state: 'evaluated',
    });

    const physical = createAbilityScore({
      category: 'physical',
      score: 70,
      state: 'evaluated',
    });

    const adaptability = createAbilityScore({
      category: 'adaptability',
      score: 90,
      state: 'evaluated',
    });

    const socialContribution =
      createAbilityScore({
        category: 'socialContribution',
        score: 60,
        state: 'evaluated',
      });

    const result = calculateOverallAbility({
      academic,
      physical,
      adaptability,
      socialContribution,
    });

    const expected =
      (80 + 90 + 70 + 60 * 0.5) / 3.5;

    expect(result.score).toBeCloseTo(
      expected,
      10,
    );

    expect(result.state).toBe('evaluated');

    expect(result.rank).toBe(
      'B+',
    );
  });

  it('does not calculate overall when an ability is not evaluated', () => {
    const result = calculateOverallAbility({
      academic: createAbilityScore({
        category: 'academic',
        score: 80,
        state: 'evaluated',
      }),

      physical: createAbilityScore({
        category: 'physical',
      }),

      adaptability: createAbilityScore({
        category: 'adaptability',
        score: 80,
        state: 'evaluated',
      }),

      socialContribution:
        createAbilityScore({
          category: 'socialContribution',
          score: 80,
          state: 'evaluated',
        }),
    });

    expect(result.score).toBeNull();
    expect(result.rank).toBeNull();
    expect(result.state).toBe(
      'not_evaluated',
    );
  });

  it('prioritizes pending verification', () => {
    const result = calculateOverallAbility({
      academic: createAbilityScore({
        category: 'academic',
        score: 80,
        state: 'evaluated',
      }),

      physical: createAbilityScore({
        category: 'physical',
        state: 'insufficient_data',
      }),

      adaptability: createAbilityScore({
        category: 'adaptability',
        state: 'pending_verification',
      }),

      socialContribution:
        createAbilityScore({
          category: 'socialContribution',
          score: 80,
          state: 'evaluated',
        }),
    });

    expect(result.score).toBeNull();
    expect(result.rank).toBeNull();

    expect(result.state).toBe(
      'pending_verification',
    );
  });

  it('preserves decimal precision', () => {
    const result = calculateOverallAbility({
      academic: createAbilityScore({
        category: 'academic',
        score: 78.42,
        state: 'evaluated',
      }),

      physical: createAbilityScore({
        category: 'physical',
        score: 67.38,
        state: 'evaluated',
      }),

      adaptability: createAbilityScore({
        category: 'adaptability',
        score: 81.17,
        state: 'evaluated',
      }),

      socialContribution:
        createAbilityScore({
          category: 'socialContribution',
          score: 59.73,
          state: 'evaluated',
        }),
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