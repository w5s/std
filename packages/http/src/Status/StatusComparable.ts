import { Comparable } from '@w5s/core/Comparable';
import { compare } from './compare.js';
import type { Status } from './Status.js';

export const StatusComparable = Comparable<Status>({
  compare,
});
