import { getAbilityRank } from '@/utils/oaa/rank';

describe('getAbilityRank', () => {
  it.each([
    [100, 'A+'],
    [96, 'A+'],
    [95.99, 'A'],

    [86, 'A'],
    [85.99, 'A-'],
    [81, 'A-'],
    [80.99, 'B+'],

    [76, 'B+'],
    [75.99, 'B'],

    [66, 'B'],
    [65.99, 'B-'],
    [61, 'B-'],
    [60.99, 'C+'],

    [56, 'C+'],
    [55.99, 'C'],

    [46, 'C'],
    [45.99, 'C-'],
    [41, 'C-'],
    [40.99, 'D+'],

    [36, 'D+'],
    [35.99, 'D'],

    [26, 'D'],
    [25.99, 'D-'],
    [21, 'D-'],
    [20.99, 'E+'],

    [16, 'E+'],
    [15.99, 'E'],

    [6, 'E'],
    [5.99, 'E-'],
    [1, 'E-'],

    [0.99, 'F'],
    [0, 'F'],
  ])(
    'returns %s for score %d',
    (score, expectedRank) => {
      expect(getAbilityRank(score)).toBe(
        expectedRank,
      );
    },
  );

  it('rejects scores below zero', () => {
    expect(() => getAbilityRank(-1)).toThrow();
  });

  it('rejects scores above 100', () => {
    expect(() => getAbilityRank(101)).toThrow();
  });

  it('rejects non-finite values', () => {
    expect(() => getAbilityRank(NaN)).toThrow();
    expect(() =>
      getAbilityRank(Infinity),
    ).toThrow();
  });
});