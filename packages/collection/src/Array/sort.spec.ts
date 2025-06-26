import { describe, it, expect } from 'vitest';
import type { Ordering } from '@w5s/core';
import { sort } from './sort.js';
import { empty } from './empty.js';

describe(sort, () => {
  const compare = (a: number, b: number): Ordering => (a === b ? 0 : a < b ? -1 : 1);

  it('should return unchanged if empty', () => {
    const emptyArray = empty();
    expect(sort(emptyArray, compare)).toBe(emptyArray);
  });
  it('should map each value to callback', () => {
    const array = [11, 4, 6, 2];

    expect(sort(array, compare)).toEqual([2, 4, 6, 11]);
  });
});
