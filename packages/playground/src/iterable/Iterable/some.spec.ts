import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { some } from './some.js';

describe(some, () => {
  it('returns true when every elements satisfies the given predicate', () => {
    const source = of(1, 3, 2);

    expect(some(source, (value) => value > 1)).toBe(true);
    expect(some(source, (value) => value < 0)).toBe(false);
  });
});