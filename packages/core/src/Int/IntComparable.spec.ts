import { describe, it, expect } from 'vitest';
import { describeComparable } from '../testing.js';
import { from } from './from.js';
import { IntComparable } from './IntComparable.js';

describe('IntComparable', () => {
  describeComparable({ describe, it, expect })(IntComparable, {
    ordered: () => [from(-1), from(0), from(1)],
    equivalent: () => [
      [from(0), from(0)],
      [from(1), from(1)],
      [from(-1), from(-1)],
    ],
  });
});
