import { Comparable } from '@w5s/core/dist/Comparable.js';
import { compare } from './compare.js';
import type { Status } from './Status.js';

export const StatusComparable = Comparable<Status>({
  compare,
});
