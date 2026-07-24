import { Comparable } from '@w5s/core/dist/Comparable.js';

import type { Time } from './Time.js';

import { compare } from './compare.js';

export const TimeComparable = Comparable<Time>({
  compare,
});
