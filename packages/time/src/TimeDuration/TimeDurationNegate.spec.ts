import { describeNegate } from '@w5s/core/Testing';
import { describe } from 'vitest';

import { TimeDuration } from './TimeDuration.js';
import { TimeDurationComparable } from './TimeDurationComparable.js';
import { TimeDurationNegate } from './TimeDurationNegate.js';

describe('TimeDurationNegate', () => {
  describeNegate(
    { ...TimeDurationNegate, ...TimeDurationComparable },
    {
      values: () => [
        [TimeDuration(0), TimeDuration(0)],
        [TimeDuration(1), TimeDuration(-1)],
      ],
    },
  );
});
