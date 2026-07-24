import { describe, expect, it } from 'vitest';

import { withIterable } from '../Testing.js';
import { of } from './of.js';

describe(of, () => {
  const expectIterable = withIterable(expect);
  it('returns an empty iterable when no parameter', () => {
    expectIterable(of()).toHaveValues([]);
  });
  it('returns a iterable of values', () => {
    expectIterable(of(1, 2, 3)).toHaveValues([1, 2, 3]);
  });
});
