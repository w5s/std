import { Comparable } from '@w5s/core/dist/Comparable.js';

import type { TimeDuration } from './TimeDuration.js';

import { compare } from './compare.js';

export const TimeDurationComparable = Comparable<TimeDuration>({
  compare,
});
