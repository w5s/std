import { describe } from 'vitest';

import { Comparable } from '../Comparable.js';
import { describeComparable } from './describeComparable.js';

describe('describeComparable', () => {
  const NumberEqual = Comparable<number>({
    compare: (left, right) => (left === right ? 0 : left < right ? -1 : 1),
  });

  describeComparable(NumberEqual, {
    equivalent: () => [
      [0, 0],
      [1, 1],
      [1.1, 1.1],
    ],
    ordered: () => [-1, 0, 1],
  });
});
