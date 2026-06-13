import { Comparable } from '@w5s/core/Comparable';

import type { Time } from './Time.js';

import { compare } from './compare.js';

export const TimeComparable = Comparable<Time>({
  compare,
});
