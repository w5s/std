import { describeSigned } from '@w5s/core/dist/testing.js';
import { describe, it, expect } from 'vitest';
import { TimeDurationSigned } from './TimeDurationSigned.js';
import { TimeDuration } from './TimeDuration.js';
import { TimeDurationComparable } from './TimeDurationComparable.js';

describe('TimeDurationSigned', () => {
  describeSigned({ describe, it, expect })(
    { ...TimeDurationComparable, ...TimeDurationSigned },
    {
      abs: [
        { call: [TimeDuration(-1)], returns: 1 },
        { call: [TimeDuration(0)], returns: 0 },
        { call: [TimeDuration(1)], returns: 1 },
      ],
      sign: [
        { call: [TimeDuration(-6)], returns: -1 },
        { call: [TimeDuration(0)], returns: 0 },
        { call: [TimeDuration(6)], returns: 1 },
      ],
    }
  );
});
