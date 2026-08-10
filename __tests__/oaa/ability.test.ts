import { createAbilityScore } from '@/utils/oaa/ability';

describe('createAbilityScore', () => {
  it('creates an evaluated ability', () => {
    const ability = createAbilityScore({
      category: 'academic',
      score: 78.42,
      state: 'evaluated',
    });

    expect(ability.category).toBe('academic');
    expect(ability.score).toBe(78.42);
    expect(ability.rank).toBe('B+');
    expect(ability.state).toBe('evaluated');
    expect(ability.updatedAt).not.toBeNull();
  });

  it('creates a not evaluated ability', () => {
    const ability = createAbilityScore({
      category: 'physical',
    });

    expect(ability.score).toBeNull();
    expect(ability.rank).toBeNull();
    expect(ability.state).toBe(
      'not_evaluated',
    );
  });

  it('creates an insufficient data ability', () => {
    const ability = createAbilityScore({
      category: 'adaptability',
      state: 'insufficient_data',
    });

    expect(ability.score).toBeNull();
    expect(ability.rank).toBeNull();
    expect(ability.state).toBe(
      'insufficient_data',
    );
  });

  it('requires a score when evaluated', () => {
    expect(() =>
      createAbilityScore({
        category: 'academic',
        state: 'evaluated',
      }),
    ).toThrow();
  });
});