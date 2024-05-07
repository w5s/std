import { describe, it, expect } from 'vitest';
import { concat } from './concat.js';

describe(concat, () => {
  it('should return unchanged if no extension is passed', () => {
    const array = [1, 2, 3];
    expect(concat(array)).toBe(array);
  });
  it('should append values', () => {
    expect(concat([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it('should return same array when no changes', () => {
    const array = [1, 2];
    expect(concat(array, [])).toBe(array);
  });
});
