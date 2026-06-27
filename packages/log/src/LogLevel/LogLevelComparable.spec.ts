import { describe } from 'vitest';
import { describeComparable } from '@w5s/core/Testing';
import { Int } from '@w5s/core/Int';
import { LogLevelComparable } from './LogLevelComparable.js';
import { of } from './of.js';

describe('LogLevelComparable', () => {
  describeComparable(LogLevelComparable, {
    ordered: () => [of('One', Int(1)), of('Two', Int(2)), of('Three', Int(3))],
    equivalent: () => [
      [of('One', Int(1)), of('One', Int(1))],
      [of('One', Int(1)), of('OneOther', Int(1))],
    ],
  });
});
