import { describe, test, expect } from '@jest/globals';
import { Iterable } from './iterable.js';

describe(Iterable, () => {
  function iteratorOf<T>(...values: T[]): Iterable<T> {
    return values;
  }
  function expectIterable<V>(iterable: Iterable<V>) {
    return {
      toHaveValues(expected: Array<unknown>) {
        expect(Array.from(iterable)).toEqual(Array.from(expected));
      },
      toBeIdemPotent() {
        expect(Array.from(iterable)).toEqual(Array.from(iterable));
      },
    };
  }

  describe(Iterable.of, () => {
    test('should return an empty iterable when 0', () => {
      expectIterable(Iterable.of()).toHaveValues([]);
    });
    test('should use mapFn(index) to generate values', () => {
      expectIterable(Iterable.of(1, 2, 3)).toHaveValues([1, 2, 3]);
    });
  });

  describe(Iterable.generate, () => {
    test('should return an empty iterable when 0', () => {
      expectIterable(Iterable.generate(0, () => 'a')).toHaveValues([]);
    });
    test('should use mapFn(index) to generate values', () => {
      expectIterable(Iterable.generate(3, (_) => _)).toHaveValues([0, 1, 2]);
    });
    test('should be idempotent', () => {
      expectIterable(Iterable.generate(3, (_) => _)).toBeIdemPotent();
    });
  });

  describe(Iterable.filter, () => {
    test('should return a filtered iterator', () => {
      const source = iteratorOf(1, 3, 2);
      expectIterable(Iterable.filter(source, (value) => value >= 2)).toHaveValues([3, 2]);
    });
    test('should be idempotent', () => {
      const source = iteratorOf(1, 3, 2);
      expectIterable(Iterable.filter(source, (value) => value >= 2)).toBeIdemPotent();
    });
  });

  describe(Iterable.map, () => {
    test('should return a mapped iterator', () => {
      const source = iteratorOf(1, 3, 2);
      expectIterable(Iterable.map(source, (value) => value * 2)).toHaveValues([2, 6, 4]);
    });
  });

  describe(Iterable.reduce, () => {
    test('should return reduce for each value using initialValue', () => {
      const source = iteratorOf(1, 3, 2);

      expect(Iterable.reduce(source, (acc, value) => acc + String(value), '')).toEqual('132');
    });
  });

  describe(Iterable.empty, () => {
    test('should return empty', () => {
      expectIterable(Iterable.empty()).toHaveValues([]);
    });
  });

  describe(Iterable.range, () => {
    test('should return a range of number', () => {
      expectIterable(Iterable.range(1, 4)).toHaveValues([1, 2, 3]);
    });

    test('should use step', () => {
      expectIterable(Iterable.range(1, 6, 2)).toHaveValues([1, 3, 5]);
    });
    test('should handle reversed range', () => {
      expectIterable(Iterable.range(6, 1, 2)).toHaveValues([6, 4, 2]);
    });
  });

  describe(Iterable.zip, () => {
    test('should return have size of left when size(left) < size(right)', () => {
      const source = iteratorOf(1);

      expectIterable(Iterable.zip(source, iteratorOf('a', 'b', 'c'))).toHaveValues([[1, 'a']]);
    });
    test('should return have size of right when size(left) > size(right)', () => {
      const source = iteratorOf(1, 2, 3);

      expectIterable(Iterable.zip(source, iteratorOf('a'))).toHaveValues([[1, 'a']]);
    });
    test('should return an iterable of tuples', () => {
      const source = iteratorOf(1, 2, 3);

      expectIterable(Iterable.zip(source, iteratorOf('a', 'b', 'c'))).toHaveValues([
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ]);
    });
  });
});
