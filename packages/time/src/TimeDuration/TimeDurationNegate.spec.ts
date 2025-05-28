import { describe, it, expect } from 'vitest';
import { describeNegate } from '@w5s/core/dist/Testing.js';
import { TimeDurationNegate } from './TimeDurationNegate.js';
import { TimeDurationComparable } from './TimeDurationComparable.js';
import { TimeDuration } from './TimeDuration.js';

describe('TimeDurationNegate', () => {
  describeNegate({ describe, it, expect })(
    { ...TimeDurationNegate, ...TimeDurationComparable },
    {
      values: () => [
        [TimeDuration(0), TimeDuration(0)],
        [TimeDuration(1), TimeDuration(-1)],
      ],
    },
  );
});
