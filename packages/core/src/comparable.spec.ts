import { describe, expect, it } from '@jest/globals';
import { Comparable } from './comparable.js';

describe('Comparable', () => {
  const anyCompare = (_left: unknown, _right: unknown) => 0;
  const numberCompare = (left: number, right: number) => left - right;
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
});
