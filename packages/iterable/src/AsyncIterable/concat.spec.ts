// packages/iterable/src/Iterable/chunks.spec.ts

import { describe, expect, it } from 'vitest';
import { concat } from './concat.js';
import { withAsyncIterable } from '../Testing.js';
import { of } from './of.js';
import { empty } from './empty.js';

describe(concat, () => {
  const expectIterable = withAsyncIterable(expect);

  // Test case for empty array input
  it('should return an empty iterable for empty input', async () => {
    const result = concat(of(empty(), empty()));
    await expectIterable(result).toHaveValues([]);
  });

  // Test case for non-empty array input
  it('should return an iterable of chunks for a non-empty array', async () => {
    const result = concat(of(of(1, 2), empty(), of(3, 4), of(5, 6)));
    await expectIterable(result).toHaveValues([1, 2, 3, 4, 5, 6]);
  });
});
