import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { withIterable } from '../Testing.js';

describe(of, () => {
  const expectIterable = withIterable(expect);
  it('returns an empty iterable when no parameter', () => {
    expectIterable(of()).toHaveValues([]);
  });
  it('returns a iterable of values', () => {
    expectIterable(of(1, 2, 3)).toHaveValues([1, 2, 3]);
  });
});
