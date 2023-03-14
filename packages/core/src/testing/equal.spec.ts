import { describe, it, expect } from 'vitest';
import { Equal } from '../equal.js';
import { describeEqual } from './equal.js';

describe('describeEqual', () => {
  const NumberEqual: Equal<number> = Equal({
    equals: (left, right) => left === right,
  });

  describeEqual({ describe, it, expect })(NumberEqual, {
    base: () => 1,
    different: () => [2, -1, 0],
  });
});
