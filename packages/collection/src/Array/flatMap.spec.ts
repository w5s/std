import { describe, it, expect, vi } from 'vitest';
import { flatMap } from './flatMap.js';
import { empty } from './empty.js';

describe(flatMap, () => {
  it('should return unchanged if empty', () => {
    const emptyArray = empty();
    expect(flatMap(emptyArray, (_) => [_ * 2, _ * 3])).toBe(emptyArray);
  });
  it('should call with (item, index, array)', () => {
    const array = ['a', 'b', 'c'];
    const mapFn = vi.fn(() => []);
    flatMap(array, mapFn);
    expect(mapFn).toHaveBeenCalledTimes(3);
    expect(mapFn).toHaveBeenNthCalledWith(1, 'a', 0, array);
    expect(mapFn).toHaveBeenNthCalledWith(2, 'b', 1, array);
    expect(mapFn).toHaveBeenNthCalledWith(3, 'c', 2, array);
  });
  it('should map each value to callback', () => {
    const array = [1, 2, 3];
    const mapFn = (_: number) => [_ * 2, _ * 3];
    expect(flatMap(array, mapFn)).toEqual([2, 3, 4, 6, 6, 9]);
  });
});
