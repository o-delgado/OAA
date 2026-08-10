import { normalizeScore } from '@/utils/oaa/normalizeScore';

describe('normalizeScore', () => {
  it('normalizes a 0-10 scale', () => {
    expect(
      normalizeScore({
        value: 8,
        min: 0,
        max: 10,
      }),
    ).toBe(80);
  });

  it('normalizes a 0-20 scale', () => {
    expect(
      normalizeScore({
        value: 17,
        min: 0,
        max: 20,
      }),
    ).toBe(85);
  });

  it('preserves decimal precision', () => {
    expect(
      normalizeScore({
        value: 7.842,
        min: 0,
        max: 10,
      }),
    ).toBeCloseTo(78.42, 10);
  });

  it('normalizes minimum to zero', () => {
    expect(
      normalizeScore({
        value: 5,
        min: 5,
        max: 15,
      }),
    ).toBe(0);
  });

  it('normalizes maximum to one hundred', () => {
    expect(
      normalizeScore({
        value: 15,
        min: 5,
        max: 15,
      }),
    ).toBe(100);
  });

  it('rejects a value below the range', () => {
    expect(() =>
      normalizeScore({
        value: -1,
        min: 0,
        max: 10,
      }),
    ).toThrow();
  });

  it('rejects a value above the range', () => {
    expect(() =>
      normalizeScore({
        value: 11,
        min: 0,
        max: 10,
      }),
    ).toThrow();
  });

  it('rejects invalid ranges', () => {
    expect(() =>
      normalizeScore({
        value: 5,
        min: 10,
        max: 10,
      }),
    ).toThrow();

    expect(() =>
      normalizeScore({
        value: 5,
        min: 10,
        max: 5,
      }),
    ).toThrow();
  });

  it('rejects non-finite numbers', () => {
    expect(() =>
      normalizeScore({
        value: NaN,
        min: 0,
        max: 10,
      }),
    ).toThrow();

    expect(() =>
      normalizeScore({
        value: 5,
        min: 0,
        max: Infinity,
      }),
    ).toThrow();
  });
});