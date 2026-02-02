import { describe, expect, it } from 'vitest';
import { Comparable } from './Comparable.js';

describe('Comparable', () => {
  const anyCompare = (_left: unknown, _right: unknown) => 0 as const;
  const numberCompare = (left: number, right: number) => (left === right ? 0 : left < right ? -1 : 1);
  const NumWithCompare = Comparable<number>({ compare: numberCompare });

  describe('compare', () => {
    it('should return unchanged when { compare }', () => {
      expect(Comparable({ compare: anyCompare })).toEqual(expect.objectContaining({ compare: anyCompare }));
    });
  });
  describe('equals', () => {
    it.each([
      [0, 0, true],
      [0, -0, true],
      [0, 1, false],
      [0, -1, false],
    ])('should return true only when left == right', (left, right, expected) => {
      expect(NumWithCompare.equals(left, right)).toBe(expected);
    });
  });
  describe('#compare', () => {
    it('should return unchanged when { compare }', () => {
      expect(Comparable({ compare: anyCompare })).toEqual(expect.objectContaining({ compare: anyCompare }));
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
    });
  });
  describe('min', () => {
    it.each([
      [0, 0, 0],
      [1, 2, 1],
      [3, 2, 2],
    ])('should return a minimal value', (left, right, expected) => {
      expect(NumWithCompare.min(left, right)).toBe(expected);
    });
  });
  describe('max', () => {
    it.each([
      [0, 0, 0],
      [1, 2, 2],
      [3, 2, 3],
    ])('should return a maximal value', (left, right, expected) => {
      expect(NumWithCompare.max(left, right)).toBe(expected);
    });
  });
  describe('clamp', () => {
    it.each([
      [0, 0, 0, 0],
      [1, 2, 3, 2],
      [3, 1, 2, 2],
    ])('should return a clamped value', (value, min, max, expected) => {
      expect(NumWithCompare.clamp(value, min, max)).toBe(expected);
    });
  });
});
