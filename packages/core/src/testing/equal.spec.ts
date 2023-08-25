import { describe, it, expect } from 'vitest';
import { Equal } from '../equal.js';
import { describeEqual } from './equal.js';

describe('describeEqual', () => {
  const NumberEqual: Equal<number> = Equal({
    equals: (left, right) => left === right,
  });

  describeEqual({ describe, it, expect })(NumberEqual, {
    equivalent: () => [
      [-1, -1],
      [0, 0],
      [1, 1],
      [1.1, 1.1],
    ],
    different: () => [
      [1, -1],
      [0.1, 0],
      [Number.NaN, Number.NaN],
    ],
  });
});
