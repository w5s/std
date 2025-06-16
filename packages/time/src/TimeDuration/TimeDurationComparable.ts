import { Comparable } from '@w5s/core/dist/Comparable.js';
import { compare } from '@w5s/num/dist/Number/compare.js';
import type { TimeDuration } from './TimeDuration.js';

export const TimeDurationComparable = Comparable<TimeDuration>({
  compare: compare as Comparable<TimeDuration>['compare'],
});
