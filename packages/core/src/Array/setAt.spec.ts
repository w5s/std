import { describe, it, expect } from 'vitest';
import { setAt } from './setAt.js';

describe(setAt, () => {
  it('should return unchanged when empty', () => {
    const array = [];
    expect(setAt(array, 0, '$')).toBe(array);
  });
  it('should handle negative index', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, -1, '$')).toEqual(['a', 'b', '$']);
  });
  it('should handle wrong index', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, -array.length - 1, '$')).toBe(array);
    expect(setAt(array, array.length, '$')).toBe(array);
  });
  it('should return unchanged when value is strict equal', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, 1, 'b')).toBe(array);
  });
  it('should return new array', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, 0, '$')).toEqual(['$', 'b', 'c']);
    expect(setAt(array, 1, '$')).toEqual(['a', '$', 'c']);
    expect(setAt(array, 2, '$')).toEqual(['a', 'b', '$']);
  });
});
