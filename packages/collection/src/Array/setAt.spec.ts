import { describe, it, expect } from 'vitest';
import { setAt } from './setAt.js';
import { empty } from './empty.js';

describe(setAt, () => {
  it('returns unchanged when empty', () => {
    const array = empty();
    expect(setAt(array, 0, '$')).toBe(array);
  });
  it('handles negative index', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, -1, '$')).toEqual(['a', 'b', '$']);
  });
  it('handles wrong index', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, -array.length - 1, '$')).toBe(array);
    expect(setAt(array, array.length, '$')).toBe(array);
  });
  it('returns unchanged when value is strict equal', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, 1, 'b')).toBe(array);
  });
  it('returns new array', () => {
    const array = ['a', 'b', 'c'];
    expect(setAt(array, 0, '$')).toEqual(['$', 'b', 'c']);
    expect(setAt(array, 1, '$')).toEqual(['a', '$', 'c']);
    expect(setAt(array, 2, '$')).toEqual(['a', 'b', '$']);
  });
});
