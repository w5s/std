import { describe, it, expect } from 'vitest';
import { reverse } from './reverse.js';
import { NumberComparable } from '../Number/NumberComparable.js';
import { withOrder } from '../Testing.js';

describe(reverse, () => {
  const expectOrder = withOrder(expect);

  it('inverts less and greater', () => {
    expectOrder(reverse(NumberComparable.compare)).toSortValues([3, 2, 1]);
  });
  it('uses .compare for Comparable', () => {
    expectOrder(reverse(NumberComparable)).toSortValues([3, 2, 1]);
  });
});
