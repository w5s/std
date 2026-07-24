import {
  describeAdd,
  describeMultiply,
  describeNegate,
  describeSigned,
  describeSubtract,
  describeZero,
} from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { BigIntComparable } from './BigIntComparable.js';
import { BigIntIntegral } from './BigIntIntegral.js';

describe('BigIntIntegral', () => {
  const subject = {
    ...BigIntComparable,
    ...BigIntIntegral,
  };
  describeZero(subject, {
    nonZero: () => [1n, 2n, -1n],
  });
  describeNegate(subject, {
    values: () => [
      [0n, 0n],
      [1n, -1n],
      [2n, -2n],
    ],
  });
  describeAdd(subject, [
    { call: [1n, 1n], returns: 2n },
    { call: [1n, -1n], returns: 0n },
  ]);
  describeSubtract(subject, [
    { call: [1n, 1n], returns: 0n },
    { call: [1n, -1n], returns: 2n },
  ]);
  describeMultiply(subject, [
    { call: [1n, 1n], returns: 1n },
    { call: [2n, 3n], returns: 6n },
    { call: [3n, 2n], returns: 6n },
  ]);
  // describePower(subject, [
  //   { call: [1n, 1n], returns: 1n },
  //   { call: [2n, 3n], returns: 8n },
  //   { call: [3n, 2n], returns: 9n },
  // ]);
  describeSigned(subject, {
    values: () => [
      { abs: 2n, sign: -1n, type: 'negative', value: -2n },
      { abs: 1n, sign: -1n, type: 'negative', value: -1n },
      { abs: 0n, sign: 0n, type: 'zero', value: 0n },
      { abs: 1n, sign: 1n, type: 'positive', value: 1n },
      { abs: 2n, sign: 1n, type: 'positive', value: 2n },
    ],
  });
});
