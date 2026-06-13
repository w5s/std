import { Comparable } from '@w5s/core/Comparable';
import { compare } from './compare.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationComparable = Comparable<TimeDuration>({
  compare,
});
