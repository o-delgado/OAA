import { createAbilityScore } from '@/utils/oaa/ability';
import {
    createOaaSnapshot,
    hasOaaChanged,
} from '@/utils/oaa/history';
import { calculateOverallAbility } from '@/utils/oaa/overallAbility';

function createOverall(
  academicScore = 80,
  physicalScore = 70,
  adaptabilityScore = 90,
  socialScore = 60,
) {
  return calculateOverallAbility({
    academic: createAbilityScore({
      category: 'academic',
      score: academicScore,
      state: 'evaluated',
    }),

    physical: createAbilityScore({
      category: 'physical',
      score: physicalScore,
      state: 'evaluated',
    }),

    adaptability: createAbilityScore({
      category: 'adaptability',
      score: adaptabilityScore,
      state: 'evaluated',
    }),

    socialContribution: createAbilityScore({
      category: 'socialContribution',
      score: socialScore,
      state: 'evaluated',
    }),
  });
}

describe('OAA history', () => {
  it('creates an OAA snapshot', () => {
    const overall = createOverall();

    const snapshot = createOaaSnapshot({
      id: 'snapshot-1',
      userId: 'user-1',
      overall,
      createdAt: '2026-08-10T00:00:00.000Z',
    });

    expect(snapshot.id).toBe('snapshot-1');
    expect(snapshot.userId).toBe('user-1');

    expect(snapshot.overall.score).toBe(
      overall.score,
    );

    expect(snapshot.academic.score).toBe(80);
    expect(snapshot.physical.score).toBe(70);

    expect(snapshot.createdAt).toBe(
      '2026-08-10T00:00:00.000Z',
    );
  });

  it('detects change when there is no previous result', () => {
    const current = createOverall();

    expect(
      hasOaaChanged(null, current),
    ).toBe(true);
  });

  it('does not detect change when results are identical', () => {
    const previous = createOverall();
    const current = createOverall();

    expect(
      hasOaaChanged(previous, current),
    ).toBe(false);
  });

  it('detects an overall score change', () => {
    const previous = createOverall();
    const current = createOverall(
      90,
      70,
      90,
      60,
    );

    expect(
      hasOaaChanged(previous, current),
    ).toBe(true);
  });

  it('detects a category score change', () => {
    const previous = createOverall();
    const current = createOverall(
      80,
      71,
      90,
      60,
    );

    expect(
      hasOaaChanged(previous, current),
    ).toBe(true);
  });

  it('detects an evaluation state change', () => {
    const previous = createOverall();

    const current = calculateOverallAbility({
      academic: createAbilityScore({
        category: 'academic',
        score: 80,
        state: 'evaluated',
      }),

      physical: createAbilityScore({
        category: 'physical',
        state: 'pending_verification',
      }),

      adaptability: createAbilityScore({
        category: 'adaptability',
        score: 90,
        state: 'evaluated',
      }),

      socialContribution: createAbilityScore({
        category: 'socialContribution',
        score: 60,
        state: 'evaluated',
      }),
    });

    expect(
      hasOaaChanged(previous, current),
    ).toBe(true);
  });

  it('ignores timestamp differences when OAA data is identical', () => {
    const previous = createOverall();
    const current = createOverall();

    previous.updatedAt =
      '2026-08-10T01:00:00.000Z';

    current.updatedAt =
      '2026-08-10T02:00:00.000Z';

    expect(
      hasOaaChanged(previous, current),
    ).toBe(false);
  });
});