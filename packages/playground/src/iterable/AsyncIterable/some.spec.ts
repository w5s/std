import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { some } from './some.js';

describe(some, () => {
  it('returns true when every elements satisfies the given predicate', async () => {
    const source = of(1, 3, 2);

    await expect(some(source, (value) => value > 1)).resolves.toBe(true);
    await expect(some(source, (value) => value < 0)).resolves.toBe(false);
  });
});
