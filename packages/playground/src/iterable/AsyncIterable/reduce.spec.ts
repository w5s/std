import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { reduce } from './reduce.js';

describe(reduce, () => {
  it('should return reduce for each value using initialValue', async () => {
    const source = of(1, 3, 2);

    await expect(reduce(source, (acc, value) => acc + String(value), '')).resolves.toEqual('132');
    await expect(reduce(source, async (acc, value) => acc + String(value), '')).resolves.toEqual('132');
  });
});
