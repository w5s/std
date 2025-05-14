import { describe, it, expect } from 'vitest';
import { sort } from './sort.js';
import { empty } from './empty.js';
import { Number } from '../Number.js';

describe(sort, () => {
  it('should return unchanged if empty', () => {
    const emptyArray = empty();
    expect(sort(emptyArray, Number.compare)).toBe(emptyArray);
  });
  it('should map each value to callback', () => {
    const array = [11, 4, 6, 2];

    expect(sort(array, Number.compare)).toEqual([2, 4, 6, 11]);
  });
});
