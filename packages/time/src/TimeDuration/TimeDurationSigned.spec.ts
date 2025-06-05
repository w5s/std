import { describeSigned } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { TimeDurationSigned } from './TimeDurationSigned.js';
import { TimeDuration } from './TimeDuration.js';
import { TimeDurationComparable } from './TimeDurationComparable.js';

describe('TimeDurationSigned', () => {
  describeSigned(
    { ...TimeDurationComparable, ...TimeDurationSigned },
    {
      values: () => [
        { value: TimeDuration(-6), type: 'negative', sign: -1, abs: 6 },
        { value: TimeDuration(-1), type: 'negative', sign: -1, abs: 1 },
        { value: TimeDuration(0), type: 'zero', sign: 0, abs: 0 },
        { value: TimeDuration(1), type: 'positive', sign: 1, abs: 1 },
        { value: TimeDuration(6), type: 'positive', sign: 1, abs: 6 },
      ],
    },
  );
});
