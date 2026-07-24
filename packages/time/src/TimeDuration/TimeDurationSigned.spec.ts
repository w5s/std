import { describeSigned } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { TimeDuration } from './TimeDuration.js';
import { TimeDurationComparable } from './TimeDurationComparable.js';
import { TimeDurationSigned } from './TimeDurationSigned.js';

describe('TimeDurationSigned', () => {
  describeSigned(
    { ...TimeDurationComparable, ...TimeDurationSigned },
    {
      values: () => [
        { abs: 6, sign: -1, type: 'negative', value: TimeDuration(-6) },
        { abs: 1, sign: -1, type: 'negative', value: TimeDuration(-1) },
        { abs: 0, sign: 0, type: 'zero', value: TimeDuration(0) },
        { abs: 1, sign: 1, type: 'positive', value: TimeDuration(1) },
        { abs: 6, sign: 1, type: 'positive', value: TimeDuration(6) },
      ],
    },
  );
});
