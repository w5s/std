import { describe, it, expect } from 'vitest';
import { Equal } from '../Equal.js';
import { describeEqual } from './describeEqual.js';

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
