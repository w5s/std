import { describe, it, expect } from 'vitest';
import { Iterable } from './iterable.js';
import { Symbol } from './symbol.js';

describe('Iterable', () => {
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

  describe('.create()', () => {
    it('should return a new Iterable from function', () => {
      const fn = () => ({ next: () => ({ done: true, value: undefined }) });
      expect(Iterable.create(fn)).toEqual({ [Symbol.iterator]: fn });
    });
  });
  describe('.of()', () => {
    it('should return an empty iterable when 0', () => {
      expectIterable(Iterable.of()).toHaveValues([]);
    });
    it('should use mapFn(index) to generate values', () => {
      expectIterable(Iterable.of(1, 2, 3)).toHaveValues([1, 2, 3]);
    });
  });

  describe('.generate()', () => {
    it('should return an empty iterable when 0', () => {
      expectIterable(Iterable.generate(0, () => 'a')).toHaveValues([]);
    });
    it('should use mapFn(index) to generate values', () => {
      expectIterable(Iterable.generate(3, (_) => _)).toHaveValues([0, 1, 2]);
    });
    it('should be idempotent', () => {
      expectIterable(Iterable.generate(3, (_) => _)).toBeIdemPotent();
    });
  });

  describe('.filter', () => {
    it('should return a filtered iterator', () => {
      const source = iteratorOf(1, 3, 2);
      expectIterable(Iterable.filter(source, (value) => value >= 2)).toHaveValues([3, 2]);
    });
    it('should be idempotent', () => {
      const source = iteratorOf(1, 3, 2);
      expectIterable(Iterable.filter(source, (value) => value >= 2)).toBeIdemPotent();
    });
  });

  describe('.map', () => {
    it('should return a mapped iterator', () => {
      const source = iteratorOf(1, 3, 2);
      expectIterable(Iterable.map(source, (value) => value * 2)).toHaveValues([2, 6, 4]);
    });
  });

  describe('.reduce', () => {
    it('should return reduce for each value using initialValue', () => {
      const source = iteratorOf(1, 3, 2);

      expect(Iterable.reduce(source, (acc, value) => acc + String(value), '')).toEqual('132');
    });
  });

  describe('.empty', () => {
    it('should return empty', () => {
      expectIterable(Iterable.empty()).toHaveValues([]);
    });
  });

  describe('.range', () => {
    it('should return a range of number', () => {
      expectIterable(Iterable.range(1, 4)).toHaveValues([1, 2, 3]);
    });

    it('should use step', () => {
      expectIterable(Iterable.range(1, 6, 2)).toHaveValues([1, 3, 5]);
    });
    it('should handle reversed range', () => {
      expectIterable(Iterable.range(6, 1, 2)).toHaveValues([6, 4, 2]);
    });
  });

  describe('.zip', () => {
    it('should return have size of left when size(left) < size(right)', () => {
      const source = iteratorOf(1);

      expectIterable(Iterable.zip(source, iteratorOf('a', 'b', 'c'))).toHaveValues([[1, 'a']]);
    });
    it('should return have size of right when size(left) > size(right)', () => {
      const source = iteratorOf(1, 2, 3);

      expectIterable(Iterable.zip(source, iteratorOf('a'))).toHaveValues([[1, 'a']]);
    });
    it('should return an iterable of tuples', () => {
      const source = iteratorOf(1, 2, 3);

      expectIterable(Iterable.zip(source, iteratorOf('a', 'b', 'c'))).toHaveValues([
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ]);
    });
  });
  describe('.hasInstance', () => {
    it.each([
      [{ [Symbol.iterator]: () => {} }, true],
      [{ [Symbol.iterator]: 'not_a_function' }, false],
      [[], true],
      [{}, false],
      ['string', false],
      [null, false],
      [undefined, false],
    ])('should return true for { [Symbol.iterator] }', (object, expected) => {
      expect(Iterable.hasInstance(object)).toEqual(expected);
    });
  });
});
