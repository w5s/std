import { describe, it, expect } from 'vitest';
import { reverse } from './reverse.js';
import { withOrder } from '../Testing.js';
import { Comparable } from '../Comparable.js';

describe(reverse, () => {
  const NumberComparable = Comparable<number>({
    compare: (l, r) => (l === r ? 0 : l < r ? -1 : 1),
  });

  const expectOrder = withOrder(expect);

  it('inverts less and greater', () => {
    expectOrder(reverse(NumberComparable.compare)).toSortValues([3, 2, 1]);
  });
  it('uses .compare for Comparable', () => {
    expectOrder(reverse(NumberComparable)).toSortValues([3, 2, 1]);
  });
});
