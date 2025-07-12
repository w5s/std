import { describe, it, expect } from 'vitest';
import { take } from './take.js';
import { withAsyncIterable } from '../Testing.js';
import { of } from './of.js';

describe(take, () => {
  const expectIterable = withAsyncIterable(expect);

  it('returns slice of source', async () => {
    const source = of(1, 3, 2);
    await expectIterable(take(source, 2)).toBeIdemPotent();
  });

  it('slices the iterable in a single step', async () => {
    const source = of(1, 2, 3, 4);
    await expectIterable(take(source, 3)).toHaveValues([1, 2, 3]);
  });

  it('handles empty iterables correctly', async () => {
    const source = of();
    await expectIterable(take(source, 2)).toHaveValues([]);
  });

  it('returns the same iterable for negative limit', async () => {
    const source = of(1, 2, 3);
    await expectIterable(take(source, -2)).toHaveValues([1, 2, 3]);
  });
});
