import { describe } from 'vitest';
import { describeComparable } from '@w5s/core/Testing';
import { BigIntComparable } from './BigIntComparable.js';

describe('BigIntComparable', () => {
  describeComparable(BigIntComparable, {
    ordered: () => [-1n, 0, 1n],
    equivalent: () => [
      [0n, 0n],
      [1n, 1n],
      [-2n, -2n],
    ],
  });
});
