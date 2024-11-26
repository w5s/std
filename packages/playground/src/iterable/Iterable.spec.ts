import { describe, it, expect } from 'vitest';
import { Symbol } from '@w5s/core';
import { Iterable } from './Iterable.js';
import { withIterable } from './Testing.js';
import { of } from './Iterable/of.js';

describe('Iterable', () => {
  const expectIterable = withIterable(expect);

  describe('.create()', () => {
    it('should return a new Iterable from function', () => {
      const fn = () => ({ next: () => ({ done: true, value: undefined }) });
      expect(Iterable.create(fn)).toEqual({ [Symbol.iterator]: fn });
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

  describe('.reduce', () => {
    it('should return reduce for each value using initialValue', () => {
      const source = of(1, 3, 2);

      expect(Iterable.reduce(source, (acc, value) => acc + String(value), '')).toEqual('132');
    });
  });

  describe('.empty', () => {
    it('should return empty', () => {
      expectIterable(Iterable.empty()).toHaveValues([]);
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
