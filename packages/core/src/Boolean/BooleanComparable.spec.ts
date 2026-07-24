import { describe } from 'vitest';

import { describeComparable } from '../Testing.js';
import { BooleanComparable } from './BooleanComparable.js';

describe('BooleanComparable', () => {
  describeComparable(BooleanComparable, {
    equivalent: () => [
      [true, true],
      [false, false],
    ],
    ordered: () => [false, true],
  });
});
