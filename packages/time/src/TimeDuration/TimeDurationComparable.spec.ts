import { describeComparable } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { TimeDuration } from './TimeDuration.js';
import { TimeDurationComparable } from './TimeDurationComparable.js';

describe('TimeDurationComparable', () => {
  describeComparable(TimeDurationComparable, {
    ordered: () => [TimeDuration(-1), TimeDuration(0), TimeDuration(1)],
    equivalent: () => [
      [TimeDuration(0), TimeDuration(0)],
      [TimeDuration(1), TimeDuration(1)],
      [TimeDuration(1.1), TimeDuration(1.1)],
    ],
  });
});
