import { describe, it, expect } from 'vitest';
import { Comparable } from '../comparable.js';
import { describeComparable } from './comparable.js';

describe('describeComparable', () => {
  const NumberEqual: Comparable<number> = Comparable({
    compare: (left, right) => left - right,
  });

  describeComparable({ describe, it, expect })(NumberEqual, {
    base: () => 1,
    inferior: (base) => [base - 1, base / 2],
    superior: (base) => [base + 1, base * 2],
  });
});
