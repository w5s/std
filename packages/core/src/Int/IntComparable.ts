import { Comparable } from '../Comparable.js';
import type { Int } from '../Int.js';
import { compare } from './compare.js';

export const IntComparable = Comparable<Int>({
  compare,
});
