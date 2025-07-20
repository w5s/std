// packages/iterable/src/Iterable/chunks.spec.ts

import { describe, expect, it } from 'vitest';
import { concat } from './concat.js';
import { withIterable } from '../Testing.js';
import { of } from './of.js';

describe(concat, () => {
  const expectIterable = withIterable(expect);

  // Test case for empty array input
  it('should return an empty iterable for empty input', () => {
    const result = concat([[], []]);
    expectIterable(result).toHaveValues([]);
  });

  // Test case for non-empty array input
  it('should return an iterable of chunks for a non-empty array', () => {
    const result = concat(of(of(1, 2), of(3, 4), of(5, 6)));
    expectIterable(result).toHaveValues([1, 2, 3, 4, 5, 6]);
  });
});
