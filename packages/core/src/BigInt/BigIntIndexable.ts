import { Indexable } from '../Indexable.js';

export const BigIntIndexable: Indexable<bigint, bigint> = {
  at: (index) => index,
  indexOf: (value) => value,
  rangeSize: (start, end) => end - start + 1n,
  *range(start, end) {
    for (let i = start; i <= end; i += 1n) {
      yield i;
    }
  },
};
