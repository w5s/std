import { describe, it, expect } from 'vitest';
import { describeComparable } from '../Testing.js';
import { Int } from '../Type/Int.js';
import { IntComparable } from './IntComparable.js';

describe('IntComparable', () => {
  describeComparable({ describe, it, expect })(IntComparable, {
    ordered: () => [Int(-1), Int(0), Int(1)],
    equivalent: () => [
      [Int(0), Int(0)],
      [Int(1), Int(1)],
      [Int(-1), Int(-1)],
    ],
  });
});
