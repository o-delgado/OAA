import { determineEvaluationState } from '@/utils/oaa/evaluation';

describe('determineEvaluationState', () => {
  it('returns evaluated when enough valid sources exist', () => {
    expect(
      determineEvaluationState({
        category: 'academic',
        validSources: 2,
        minimumRequiredSources: 2,
      }),
    ).toBe('evaluated');
  });

  it('returns not evaluated when no data exists', () => {
    expect(
      determineEvaluationState({
        category: 'physical',
        validSources: 0,
        pendingSources: 0,
        minimumRequiredSources: 2,
      }),
    ).toBe('not_evaluated');
  });

  it('returns pending verification when data is pending', () => {
    expect(
      determineEvaluationState({
        category: 'adaptability',
        validSources: 0,
        pendingSources: 1,
        minimumRequiredSources: 2,
      }),
    ).toBe('pending_verification');
  });

  it('returns insufficient data when some valid data exists but it is not enough', () => {
    expect(
      determineEvaluationState({
        category: 'socialContribution',
        validSources: 1,
        pendingSources: 0,
        minimumRequiredSources: 2,
      }),
    ).toBe('insufficient_data');
  });

  it('prioritizes evaluated once enough verified data exists', () => {
    expect(
      determineEvaluationState({
        category: 'academic',
        validSources: 2,
        pendingSources: 3,
        minimumRequiredSources: 2,
      }),
    ).toBe('evaluated');
  });

  it('rejects negative source counts', () => {
    expect(() =>
      determineEvaluationState({
        category: 'academic',
        validSources: -1,
      }),
    ).toThrow();
  });

  it('rejects non-integer source counts', () => {
    expect(() =>
      determineEvaluationState({
        category: 'academic',
        validSources: 1.5,
      }),
    ).toThrow();
  });

  it('rejects invalid minimum requirements', () => {
    expect(() =>
      determineEvaluationState({
        category: 'academic',
        validSources: 0,
        minimumRequiredSources: 0,
      }),
    ).toThrow();
  });
});