import { describe } from 'vitest';

import { Equal } from '../Equal.js';
import { describeEqual } from './describeEqual.js';

describe('describeEqual', () => {
  const NumberEqual = Equal<number>({
    equals: (left, right) => left === right,
  });

  describeEqual(NumberEqual, {
    different: () => [
      [1, -1],
      [0.1, 0],
      [NaN, NaN],
    ],
    equivalent: () => [
      [-1, -1],
      [0, 0],
      [1, 1],
      [1.1, 1.1],
    ],
  });
});
