import { describe, it, expect } from 'vitest';
import { reverse } from './reverse.js';
import { NumberComparable } from '../Number/NumberComparable.js';
import { Ordering } from '../Ordering.js';

describe(reverse, () => {
  it('inverts less and greater', () => {
    expect(reverse(NumberComparable.compare)(1, 1)).toBe(Ordering.Equal);
    expect(reverse(NumberComparable.compare)(1, 2)).toBe(Ordering.Greater);
    expect(reverse(NumberComparable.compare)(2, 1)).toBe(Ordering.Less);
  });
  it('uses .compare for Comparable', () => {
    expect(reverse(NumberComparable)(1, 2)).toBe(Ordering.Greater);
  });
});
