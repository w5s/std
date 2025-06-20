import { describeAdd, describeSubtract } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { Time } from './Time.js';
import { TimeNumeric } from './TimeNumeric.js';
import { TimeComparable } from './TimeComparable.js';
import { TimeDuration } from '../TimeDuration.js';

describe('TimeNumeric', () => {
  const subject = { ...TimeComparable, ...TimeNumeric };
  describeAdd(subject, [
    { call: [Time(1), TimeDuration(1)], returns: Time(2) },
    { call: [Time(1), TimeDuration(-1)], returns: Time(0) },
  ]);
  describeSubtract(subject, [
    { call: [Time(1), TimeDuration(1)], returns: Time(0) },
    { call: [Time(1), TimeDuration(-1)], returns: Time(2) },
  ]);
});
