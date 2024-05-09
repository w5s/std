import { Comparable } from '../Comparable.js';

export const NumberComparable = Comparable<number>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});
