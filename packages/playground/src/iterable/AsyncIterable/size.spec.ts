import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { size } from './size.js';

describe(size, () => {
  it('should return reduce for each value using initialValue', async () => {
    const source = of(1, 3, 2);

    await expect(size(source)).resolves.toEqual(3);
  });
});
