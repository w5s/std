import { describe, it, expect } from 'vitest';
import { describeComparable } from '../testing.js';
import { BigIntComparable } from './BigIntComparable.js';

describe('BigIntComparable', () => {
  describeComparable({ describe, it, expect })(BigIntComparable, {
    ordered: () => [-1n, 0, 1n],
    equivalent: () => [
      [0n, 0n],
      [1n, 1n],
      [-2n, -2n],
    ],
  });
});
