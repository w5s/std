import { describe, expect, it } from '@jest/globals';
import { Comparable } from './comparable.js';

describe(Comparable, () => {
  const anyCompare = (_left: unknown, _right: unknown) => 0;
  const numberCompare = (left: number, right: number) => left - right;
  const NumWithCompare = Comparable<number>({ compare: numberCompare });
  const NumWithOp = Comparable<number>({ '<': (left, right) => left < right, '==': (left, right) => left === right });

  describe('#compare', () => {
    it('should return unchanged when { compare }', () => {
      expect(Comparable({ compare: anyCompare })).toEqual(expect.objectContaining({ compare: anyCompare }));
    });
    it('should return compare when { "<", "==" }', () => {
      const Test = Comparable<string>({ '<': (left, right) => left < right, '==': (left, right) => left === right });
      expect(Test.compare('', '')).toEqual(0);
      expect(Test.compare('a', 'b')).toEqual(-1);
      expect(Test.compare('b', 'a')).toEqual(1);
    });
  });
  describe('==', () => {
    it.each([
      [0, 0, true],
      [0, -0, true],
      [0, 1, false],
      [0, -1, false],
    ])('should return true only when left == right', (left, right, expected) => {
      expect(NumWithCompare['=='](left, right)).toBe(expected);
      expect(NumWithOp['=='](left, right)).toBe(expected);
    });
  });
  describe('!=', () => {
    it.each([
      [0, 0, false],
      [0, -0, false],
      [0, 1, true],
      [0, -1, true],
    ])('should return true only when left != right', (left, right, expected) => {
      expect(NumWithCompare['!='](left, right)).toBe(expected);
      expect(NumWithOp['!='](left, right)).toBe(expected);
    });
  });
  describe('<', () => {
    it.each([
      [0, 0, false],
      [0, -0, false],
      [0, 1, true],
      [0, -1, false],
    ])('should return true only when left < right', (left, right, expected) => {
      expect(NumWithCompare['<'](left, right)).toBe(expected);
      expect(NumWithOp['<'](left, right)).toBe(expected);
    });
  });
  describe('<=', () => {
    it.each([
      [0, 0, true],
      [0, -0, true],
      [0, 1, true],
      [0, -1, false],
    ])('should return true only when left <= right', (left, right, expected) => {
      expect(NumWithCompare['<='](left, right)).toBe(expected);
      expect(NumWithOp['<='](left, right)).toBe(expected);
    });
  });
  describe('>', () => {
    it.each([
      [0, 0, false],
      [0, -0, false],
      [0, 1, false],
      [0, -1, true],
    ])('should return true only when left > right', (left, right, expected) => {
      expect(NumWithCompare['>'](left, right)).toBe(expected);
      expect(NumWithOp['>'](left, right)).toBe(expected);
    });
  });
  describe('>=', () => {
    it.each([
      [0, 0, true],
      [0, -0, true],
      [0, 1, false],
      [0, -1, true],
    ])('should return true only when left >= right', (left, right, expected) => {
      expect(NumWithCompare['>='](left, right)).toBe(expected);
      expect(NumWithOp['>='](left, right)).toBe(expected);
    });
  });
});
