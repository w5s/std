import { describe, it, expect } from 'vitest';
import { drop } from './drop.js';
import { withIterable } from '../Testing.js';
import { of } from './of.js';

describe(drop, () => {
  const expectIterable = withIterable(expect);

  it('returns slice of source', () => {
    const source = of(1, 3, 2);
    expectIterable(drop(source, 1)).toBeIdemPotent();
  });

  it('slices the iterable in a single step', () => {
    const source = of(1, 2, 3, 4);
    expectIterable(drop(source, 2)).toHaveValues([3, 4]);
  });

  it('handles empty iterables correctly', () => {
    const source = of();
    expectIterable(drop(source, 2)).toHaveValues([]);
  });

  it('returns the same iterable for negative limit', () => {
    const source = of(1, 2, 3);
    expectIterable(drop(source, -2)).toHaveValues([1, 2, 3]);
  });
});
