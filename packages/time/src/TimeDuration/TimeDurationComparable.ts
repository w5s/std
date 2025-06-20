import { Comparable } from '@w5s/core/dist/Comparable.js';
import { compare } from './compare.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationComparable = Comparable<TimeDuration>({
  compare,
});
