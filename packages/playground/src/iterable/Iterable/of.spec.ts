import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { withIterable } from '../Testing.js';

describe(of, () => {
  const expectIterable = withIterable(expect);
  it('should return an empty iterable when 0', () => {
    expectIterable(of()).toHaveValues([]);
  });
  it('should use mapFn(index) to generate values', () => {
    expectIterable(of(1, 2, 3)).toHaveValues([1, 2, 3]);
  });
});
