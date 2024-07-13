import { describe, it, expect } from 'vitest';
import { describeComparable } from '../Testing.js';
import { BooleanComparable } from './BooleanComparable.js';

describe('BooleanComparable', () => {
  describeComparable({ describe, it, expect })(BooleanComparable, {
    ordered: () => [false, true],
    equivalent: () => [
      [true, true],
      [false, false],
    ],
  });
});
