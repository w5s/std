import { describe } from 'vitest';
import { describeComparable } from '@w5s/core/dist/Testing.js';
import { Int } from '../Int.js';
import { IntComparable } from './IntComparable.js';

describe('IntComparable', () => {
  describeComparable(IntComparable, {
    ordered: () => [Int(-1), Int(0), Int(1)],
    equivalent: () => [
      [Int(0), Int(0)],
      [Int(1), Int(1)],
      [Int(-1), Int(-1)],
    ],
  });
});
