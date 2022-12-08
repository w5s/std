import { describe, expect, it } from '@jest/globals';
import { Equal } from './equal.js';

describe(Equal, () => {
  const NumberEqual = Equal<number>({ '==': (left, right) => left === right });

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
