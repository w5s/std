import { describe, expect, it } from 'vitest';
import { Equal } from './Equal.js';

describe('Equal', () => {
  const equals = (left: number, right: number) => left === right;
  const NumberEqual = Equal<number>({ equals });
  describe('.equals', () => {
    it('should return true only when left == right', () => {
      expect(NumberEqual.equals).toBe(equals);
    });
  });
  describe('==', () => {
    it.each([
      [0, 0, true],
      [0, -0, true],
      [0, 1, false],
      [0, -1, false],
    ])('should return true only when left == right', (left, right, expected) => {
      expect(NumberEqual['=='](left, right)).toBe(expected);
    });
  });
  describe('!=', () => {
    it.each([
      [0, 0, false],
      [0, -0, false],
      [0, 1, true],
      [0, -1, true],
    ])('should return true only when left != right', (left, right, expected) => {
      expect(NumberEqual['!='](left, right)).toBe(expected);
    });
  });
});
