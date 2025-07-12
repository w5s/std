import { describe, it, expect } from 'vitest';
import { take } from './take.js';
import { withIterable } from '../Testing.js';
import { of } from './of.js';

describe(take, () => {
  const expectIterable = withIterable(expect);

  it('returns slice of source', () => {
    const source = of(1, 3, 2);
    expectIterable(take(source, 2)).toBeIdemPotent();
  });

  it('slices the iterable in a single step', () => {
    const source = of(1, 2, 3, 4);
    expectIterable(take(source, 3)).toHaveValues([1, 2, 3]);
  });

  it('handles empty iterables correctly', () => {
    const source = of();
    expectIterable(take(source, 2)).toHaveValues([]);
  });

  it('returns the same iterable for negative limit', () => {
    const source = of(1, 2, 3);
    expectIterable(take(source, -2)).toHaveValues([1, 2, 3]);
  });
});
