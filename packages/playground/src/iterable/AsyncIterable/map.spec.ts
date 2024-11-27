import { describe, it, expect } from 'vitest';
import { map } from './map.js';
import { withAsyncIterable } from '../Testing.js';
import { of } from './of.js';

describe(map, () => {
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should return a mapped iterator', async () => {
    const source = of(1, 3, 2);
    await expectAsyncIterable(map(source, (value) => value * 2)).toHaveValues([2, 6, 4]);
    await expectAsyncIterable(map(source, async (value) => value * 2)).toHaveValues([2, 6, 4]);
  });
  it('should be idempotent', async () => {
    const source = of(1, 3, 2);
    await expectAsyncIterable(map(source, (value) => value * 2)).toBeIdemPotent();
    await expectAsyncIterable(map(source, async (value) => value * 2)).toBeIdemPotent();
  });
});
