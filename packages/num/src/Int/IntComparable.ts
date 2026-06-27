import { Comparable } from '@w5s/core/Comparable';
import type { Int } from '../Int.js';
import { compare } from './compare.js';

export const IntComparable = Comparable<Int>({
  compare,
});
