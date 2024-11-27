import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { every } from './every.js';

describe(every, () => {
  it('returns true when every elements satisfies the given predicate', () => {
    const source = of(1, 3, 2);

    expect(every(source, (value) => value > 0)).toBe(true);
    expect(every(source, (value) => value > 1)).toBe(false);
  });
});
