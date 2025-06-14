import { describe } from 'vitest';
import { describeSigned } from '@w5s/core/dist/Testing.js';
import { BigIntComparable } from './BigIntComparable.js';
import { BigIntSigned } from './BigIntSigned.js';

describe('BigIntSigned', () => {
  describeSigned(
    {
      ...BigIntComparable,
      ...BigIntSigned,
    },
    {
      values: () => [
        { value: -2n, type: 'negative', sign: -1n, abs: 2n },
        { value: -1n, type: 'negative', sign: -1n, abs: 1n },
        { value: 0n, type: 'zero', sign: 0n, abs: 0n },
        { value: 1n, type: 'positive', sign: 1n, abs: 1n },
        { value: 2n, type: 'positive', sign: 1n, abs: 2n },
      ],
    },
  );
});
