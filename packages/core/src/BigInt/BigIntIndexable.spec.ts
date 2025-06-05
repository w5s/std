import { describe } from 'vitest';
import { describeIndexable } from '../Testing.js';
import { BigIntIndexable } from './BigIntIndexable.js';

describe('BigIntIndexable', () => {
  describeIndexable(BigIntIndexable, {
    index: [
      [0n, 0n],
      [1n, 1n],
    ],
    rangeSize: [
      [1n, 3n, 3n],
      [1n, 4n, 4n],
    ],
    range: [
      [0n, 2n, [0n, 1n, 2n]],
      [1n, 4n, [1n, 2n, 3n, 4n]],
    ],
  });
});
