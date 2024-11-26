import { describe, it, expect } from 'vitest';
import { filter } from './filter.js';
import { withIterable } from '../Testing.js';
import { of } from './of.js';

describe(filter, () => {
  const expectIterable = withIterable(expect);
  it('should return a filtered iterator', () => {
    const source = of(1, 3, 2);
    expectIterable(filter(source, (value) => value >= 2)).toHaveValues([3, 2]);
  });
  it.skip('should be idempotent', () => {
    const source = of(1, 3, 2);
    expectIterable(filter(source, (value) => value >= 2)).toBeIdemPotent();
  });
});
