import { describe, it, expect } from 'vitest';
import { setAt } from './setAt.js';

describe(setAt, () => {
  it('should return unchanged when index < 0', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, -1, '$')).toBe(array);
  });
  it('should return unchanged when index > array.length', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, array.length + 1, '$')).toBe(array);
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
