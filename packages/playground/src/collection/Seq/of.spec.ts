import { describe, it, expect } from 'vitest';
import { withIterable } from '@w5s/iterable/dist/Testing.js';
import { of } from './of.js';

describe(of, () => {
  const expectIterable = withIterable(expect);
  it('returns an empty iterable when empty parameters', () => {
    expectIterable(of()).toHaveValues([]);
  });
  it('returns a sequence of values', () => {
    expectIterable(of(1, 2, 3)).toHaveValues([1, 2, 3]);
  });
});
