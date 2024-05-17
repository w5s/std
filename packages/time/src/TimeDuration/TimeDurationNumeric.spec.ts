import { describeNumeric } from '@w5s/core/dist/testing.js';
import { describe, it, expect } from 'vitest';
import { TimeDuration } from './TimeDuration.js';
import { TimeDurationNumeric } from './TimeDurationNumeric.js';
import { TimeDurationComparable } from './TimeDurationComparable.js';

describe('TimeDurationNumeric', () => {
  describeNumeric({ describe, it, expect })(
    { ...TimeDurationComparable, ...TimeDurationNumeric },
    {
      '+': [
        { call: [TimeDuration(1), TimeDuration(1)], returns: 2 },
        { call: [TimeDuration(1), TimeDuration(-1)], returns: 0 },
      ],
      '-': [
        { call: [TimeDuration(1), TimeDuration(1)], returns: 0 },
        { call: [TimeDuration(1), TimeDuration(-1)], returns: 2 },
      ],
      '*': [
        { call: [TimeDuration(1), TimeDuration(1)], returns: 1 },
        { call: [TimeDuration(2), TimeDuration(3)], returns: 6 },
        { call: [TimeDuration(3), TimeDuration(2)], returns: 6 },
      ],
    }
  );
});
