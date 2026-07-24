import { Int } from '@w5s/core';
import { describeComparable } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { LogLevelComparable } from './LogLevelComparable.js';
import { of } from './of.js';

describe('LogLevelComparable', () => {
  describeComparable(LogLevelComparable, {
    equivalent: () => [
      [of('One', Int(1)), of('One', Int(1))],
      [of('One', Int(1)), of('OneOther', Int(1))],
    ],
    ordered: () => [of('One', Int(1)), of('Two', Int(2)), of('Three', Int(3))],
  });
});
