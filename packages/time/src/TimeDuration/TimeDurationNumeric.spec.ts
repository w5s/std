import { describeAdd, describeMultiply, describeSubtract } from '@w5s/core/dist/Testing.js';
import { describe, it, expect } from 'vitest';
import { TimeDuration } from './TimeDuration.js';
import { TimeDurationNumeric } from './TimeDurationNumeric.js';
import { TimeDurationComparable } from './TimeDurationComparable.js';

describe('TimeDurationNumeric', () => {
  const subject = { ...TimeDurationComparable, ...TimeDurationNumeric };
  describeAdd({ describe, it, expect })(subject, [
    { call: [TimeDuration(1), 1], returns: 2 },
    { call: [TimeDuration(1), -1], returns: 0 },
  ]);
  describeSubtract({ describe, it, expect })(subject, [
    { call: [TimeDuration(1), 1], returns: 0 },
    { call: [TimeDuration(1), -1], returns: 2 },
  ]);
  describeMultiply({ describe, it, expect })(subject, [
    { call: [TimeDuration(1), 1], returns: 1 },
    { call: [TimeDuration(2), 3], returns: 6 },
    { call: [TimeDuration(3), 2], returns: 6 },
  ]);
});
