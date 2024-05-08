import { Comparable } from '../Comparable.js';
import type { Int } from '../Int.js';

export const IntComparable = Comparable<Int>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});
