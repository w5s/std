import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { every } from './every.js';

describe(every, () => {
  it('returns true when every elements satisfies the given predicate', async () => {
    const source = of(1, 3, 2);

    await expect(every(source, (value) => value > 0)).resolves.toBe(true);
    await expect(every(source, (value) => value > 1)).resolves.toBe(false);
  });
});
