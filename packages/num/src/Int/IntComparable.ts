import { Comparable } from '@w5s/core/dist/Comparable.js';
import type { Int } from '../Int.js';
import { compare } from './compare.js';

export const IntComparable = Comparable<Int>({
  compare,
});
