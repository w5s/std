import { describe, it, expect } from 'vitest';
import { deleteAt } from './deleteAt.js';
import { empty } from './empty.js';

describe(deleteAt, () => {
  it('should return unchanged when empty', () => {
    const emptyArray = empty();
    expect(deleteAt(emptyArray, 1)).toBe(emptyArray);
  });
  it('should return empty() when only one element is removed', () => {
    const array = [1];
    expect(deleteAt(array, 0)).toBe(empty());
  });
  it('should return unchanged when index is < 0', () => {
    const array = [1, 2, 3];
    expect(deleteAt(array, -1)).toBe(array);
  });
  it('should return unchanged when index is >= array length', () => {
    const array = [1, 2, 3];
    expect(deleteAt(array, 3)).toBe(array);
  });
  it('should return new array without element', () => {
    const array = [1, 2, 3, 4, 5];
    expect(deleteAt(array, 2)).toEqual([1, 2, 4, 5]);
  });
});
