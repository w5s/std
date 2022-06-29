import { describe, test, expect } from '@jest/globals';
import { Iterable } from './iterable.js';

describe(Iterable, () => {
  function* generatorOf<T>(...values: T[]): Iterable<T> {
    for (const value of values) {
      yield value;
    }
  }

  describe(Iterable.of, () => {
    test('should return an empty iterable when 0', () => {
      expect(Array.from(Iterable.of())).toEqual([]);
    });
    test('should use mapFn(index) to generate values', () => {
      expect(Array.from(Iterable.of(1, 2, 3))).toEqual([1, 2, 3]);
    });
  });

  describe(Iterable.generate, () => {
    test('should return an empty iterable when 0', () => {
      expect(Array.from(Iterable.generate(0, () => 'a'))).toEqual([]);
    });
    test('should use mapFn(index) to generate values', () => {
      expect(Array.from(Iterable.generate(3, (_) => _))).toEqual([0, 1, 2]);
    });
  });

  describe(Iterable.filter, () => {
    test('should return a filtered iterator', () => {
      expect(Array.from(Iterable.filter(generatorOf(1, 3, 2), (value) => value >= 2))).toEqual([3, 2]);
    });
  });

  describe(Iterable.map, () => {
    test('should return a mapped iterator', () => {
      expect(Array.from(Iterable.map(generatorOf(1, 3, 2), (value) => value * 2))).toEqual([2, 6, 4]);
    });
  });

  describe(Iterable.reduce, () => {
    test('should return reduce for each value using initialValue', () => {
      expect(Iterable.reduce(generatorOf(1, 3, 2), (acc, value) => acc + String(value), '')).toEqual('132');
    });
  });

  describe(Iterable.empty, () => {
    test('should return empty', () => {
      expect(Array.from(Iterable.empty())).toEqual([]);
    });
  });

  describe(Iterable.range, () => {
    test('should return a range of number', () => {
      expect(Array.from(Iterable.range(1, 4))).toEqual([1, 2, 3]);
    });

    test('should use step', () => {
      expect(Array.from(Iterable.range(1, 6, 2))).toEqual([1, 3, 5]);
    });
    test('should handle reversed range', () => {
      expect(Array.from(Iterable.range(6, 1, 2))).toEqual([6, 4, 2]);
    });
  });

  describe(Iterable.zip, () => {
    test('should return have size of left when size(left) < size(right)', () => {
      expect(Array.from(Iterable.zip(generatorOf(1), generatorOf('a', 'b', 'c')))).toEqual([[1, 'a']]);
    });
    test('should return have size of right when size(left) > size(right)', () => {
      expect(Array.from(Iterable.zip(generatorOf(1, 2, 3), generatorOf('a')))).toEqual([[1, 'a']]);
    });
    test('should return an iterable of tuples', () => {
      expect(Array.from(Iterable.zip(generatorOf(1, 2, 3), generatorOf('a', 'b', 'c')))).toEqual([
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ]);
    });
  });
});
