import { describe, it, expect } from 'vitest';
import { Comparable } from '../Comparable.js';
import { describeComparable } from './describeComparable.js';

describe('describeComparable', () => {
  const NumberEqual: Comparable<number> = Comparable({
    compare: (left, right) => left - right,
  });

  describeComparable({ describe, it, expect })(NumberEqual, {
    ordered: () => [-1, 0, 1],
    equivalent: () => [
      [0, 0],
      [1, 1],
      [1.1, 1.1],
    ],
  });
});
