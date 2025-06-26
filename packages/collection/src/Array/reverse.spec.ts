import { describe, it, expect } from 'vitest';
import { reverse } from './reverse.js';
import { empty } from './empty.js';

describe(reverse, () => {
  it('should return unchanged if empty', () => {
    const emptyArray = empty();
    expect(reverse(emptyArray)).toBe(emptyArray);
  });
  it('should return same array if no value changed', () => {
    const array = [1, 2, 1];
    expect(reverse(array)).toBe(array);
  });
  it('should map each value to callback', () => {
    const array = [1, 2, 3];
    expect(reverse(array)).toEqual(array.slice().reverse());
  });
});
