import { Comparable } from '@w5s/core/Comparable';

import type { Status } from './Status.js';

import { compare } from './compare.js';

export const StatusComparable = Comparable<Status>({
  compare,
});
