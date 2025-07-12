import { describe, it, expect } from 'vitest';
import { drop } from './drop.js';
import { withAsyncIterable } from '../Testing.js';
import { of } from './of.js';

describe(drop, () => {
  const expectIterable = withAsyncIterable(expect);

  it('returns slice of source', async () => {
    const source = of(1, 3, 2);
    await expectIterable(drop(source, 1)).toBeIdemPotent();
  });

  it('slices the iterable in a single step', async () => {
    const source = of(1, 2, 3, 4);
    await expectIterable(drop(source, 2)).toHaveValues([3, 4]);
  });

  it('handles empty iterables correctly', async () => {
    const source = of();
    await expectIterable(drop(source, 2)).toHaveValues([]);
  });

  it('returns the same iterable for negative limit', async () => {
    const source = of(1, 2, 3);
    await expectIterable(drop(source, -2)).toHaveValues([1, 2, 3]);
  });
});
