export interface NormalizeScoreInput {
  value: number;
  min: number;
  max: number;
}

export function normalizeScore({
  value,
  min,
  max,
}: NormalizeScoreInput): number {
  if (
    !Number.isFinite(value) ||
    !Number.isFinite(min) ||
    !Number.isFinite(max)
  ) {
    throw new Error(
      'Normalization values must be finite numbers.',
    );
  }

  if (max <= min) {
    throw new Error(
      'Maximum must be greater than minimum.',
    );
  }

  if (value < min || value > max) {
    throw new Error(
      'Value must be inside the normalization range.',
    );
  }

  return ((value - min) / (max - min)) * 100;
}