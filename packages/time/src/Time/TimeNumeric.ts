import type { Numeric } from '@w5s/core';

import type { TimeDuration } from '../TimeDuration.js';
import type { Time } from './Time.js';

interface TimeNumeric extends Numeric.Add<Time, TimeDuration, Time>, Numeric.Subtract<Time, TimeDuration, Time> {}

export const TimeNumeric: TimeNumeric = {
  '+': (time, duration) => ((time as number) + (duration as number)) as Time,
  '-': (time, duration) => ((time as number) - (duration as number)) as Time,
};
