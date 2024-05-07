import { describe, it, expect } from 'vitest';
import { empty } from './empty.js';
import { map } from './map.js';

describe(map, () => {
  it('should return unchanged if empty', () => {
    const emptyArray = empty();
    expect(map(emptyArray, (_) => _ * 2)).toBe(emptyArray);
  });
  it('should return same ref when no changed value', () => {
    const array = [1, 2, 3];
    const identity = (_: number) => _;
    expect(map(array, identity)).toBe(array);
  });
  it('should map each value to callback', () => {
    const array = [1, 2, 3];
    const double = (_: number) => _ * 2;
    expect(map(array, double)).toEqual(array.map(double));
  });
});
