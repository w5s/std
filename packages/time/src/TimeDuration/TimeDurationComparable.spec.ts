import { describeComparable } from '@w5s/core/dist/testing.js';
import { describe, it, expect } from 'vitest';
import { TimeDuration } from './TimeDuration.js';
import { TimeDurationComparable } from './TimeDurationComparable.js';

describe('TimeDurationComparable', () => {
  describeComparable({ describe, it, expect })(TimeDurationComparable, {
    ordered: () => [TimeDuration(-1), TimeDuration(0), TimeDuration(1)],
    equivalent: () => [
      [TimeDuration(0), TimeDuration(0)],
      [TimeDuration(1), TimeDuration(1)],
      [TimeDuration(1.1), TimeDuration(1.1)],
    ],
  });
});
