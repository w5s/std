import { describe, it, expect } from 'vitest';
import { empty } from './empty.js';
import { insertAt } from './insertAt.js';

describe(insertAt, () => {
  it('should return a new array', () => {
    const array = empty<string>();
    expect(insertAt(array, 0, '$')).toEqual(['$']);
  });
  it('should return unchanged when index < 0', () => {
    const array = ['a', 'b', 'c'];
    expect(insertAt(array, -1, '$')).toBe(array);
  });
  it('should return unchanged when index > array.length', () => {
    const array = ['a', 'b', 'c'];
    expect(insertAt(array, array.length + 1, '$')).toBe(array);
  });
  it('should return new array', () => {
    const array = ['a', 'b', 'c'];
    expect(insertAt(array, 0, '$')).toEqual(['$', 'a', 'b', 'c']);
    expect(insertAt(array, 1, '$')).toEqual(['a', '$', 'b', 'c']);
    expect(insertAt(array, 2, '$')).toEqual(['a', 'b', '$', 'c']);
    expect(insertAt(array, 3, '$')).toEqual(['a', 'b', 'c', '$']);
  });
});
