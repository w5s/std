import { Comparable } from '@w5s/core/dist/Comparable.js';
import { compare } from '@w5s/num/dist/Number/compare.js';
import type { Time } from './Time.js';

export const TimeComparable = Comparable<Time>({
  compare: compare as Comparable<Time>['compare'],
});
