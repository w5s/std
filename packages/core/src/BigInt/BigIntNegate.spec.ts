import { describe, it, expect } from 'vitest';
import { BigIntNegate } from './BigIntNegate.js';
import { describeNegate } from '../Testing.js';
import { BigIntComparable } from './BigIntComparable.js';

describe('BigIntNegate', () => {
  describeNegate({ describe, it, expect })(
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
