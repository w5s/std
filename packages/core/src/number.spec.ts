import { describe, it, expect } from 'vitest';
import { Number } from './number.js';
import { assertType, describeComparable } from './testing.js';

describe('Number', () => {
  describe('.hasInstance', () => {
    it('should return true for number', () => {
      expect(Number.hasInstance(1)).toEqual(true);
    });
    it('should return false for any other value', () => {
      expect(Number.hasInstance(null)).toBe(false);
      expect(Number.hasInstance({ length: 0 })).toBe(false);
    });
    it('should refine type', () => {
      const someValue = 'true' as string | number;

      if (Number.hasInstance(someValue)) {
        assertType<typeof someValue, number>(true);
      } else {
        assertType<typeof someValue, string>(true);
      }
    });
  });

  describeComparable({ describe, it, expect })(Number, {
    ordered: () => [-1, 0, 1],
    equivalent: () => [
      [0, 0],
      [1, 1],
      [1.1, 1.1],
    ],
  });
  describe('.minValue', () => {
    it('should be Number.MIN_VALUE', () => {
      expect(Number.minValue).toBe(globalThis.Number.MIN_VALUE);
    });
  });
  describe('.maxValue', () => {
    it('should be Number.MAX_VALUE', () => {
      expect(Number.maxValue).toBe(globalThis.Number.MAX_VALUE);
    });
  });
  describe('+', () => {
    it('adds to numbers', () => {
      expect(Number['+'](1, 1)).toBe(2);
    });
  });
  describe('-', () => {
    it('adds to numbers', () => {
      expect(Number['-'](1, 1)).toBe(0);
    });
  });
});
