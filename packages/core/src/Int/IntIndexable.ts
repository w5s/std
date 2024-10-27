import { Indexable } from '../Indexable.js';
import type { Int } from '../Int.js';

export const IntIndexable: Indexable<Int, Int> = {
  at: (index) => index,
  indexOf: (value) => value,
  rangeSize: (start, end) => (end - start + 1) as Int,
  *range(start, end) {
    for (let i: number = start; i <= end; i += 1) {
      yield i as Int;
    }
  },
};
