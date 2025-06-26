import { describe, it, expect } from 'vitest';
import { filter } from './filter.js';
import { empty } from './empty.js';

describe('.filter', () => {
  it('should return unchanged if empty', () => {
    const emptyArray = empty();
    expect(filter(emptyArray, () => true)).toBe(emptyArray);
  });
  it('should return same array if no value changed', () => {
    const array = [1, 2, 3];
    expect(filter(array, () => true)).toBe(array);
  });
  it('should return empty() if always false', () => {
    const array = [1, 2, 3];
    expect(filter(array, () => false)).toBe(empty());
  });
  it('should map each value to callback', () => {
    const array = [1, 2, 3];

    const minOne = (_: number) => _ > 1;
    expect(filter(array, minOne)).toEqual([2, 3].filter(minOne));
  });
});
