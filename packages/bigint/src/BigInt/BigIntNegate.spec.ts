import { describe } from 'vitest';
import { describeNegate } from '@w5s/core/dist/Testing.js';
import { BigIntNegate } from './BigIntNegate.js';
import { BigIntComparable } from './BigIntComparable.js';

describe('BigIntNegate', () => {
  describeNegate(
    { ...BigIntNegate, ...BigIntComparable },
    {
      values: () => [
        [0n, 0n],
        [1n, -1n],
        [2n, -2n],
      ],
    },
  );
});
