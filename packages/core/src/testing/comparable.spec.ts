import { describe, it, expect } from 'vitest';
import { Comparable } from '../comparable.js';
import { describeComparable } from './comparable.js';

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
