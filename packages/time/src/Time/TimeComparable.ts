import { Comparable } from '@w5s/core/Comparable';
import { compare } from './compare.js';
import type { Time } from './Time.js';

export const TimeComparable = Comparable<Time>({
  compare,
});
