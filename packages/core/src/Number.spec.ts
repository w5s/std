import { describe, it, expect } from 'vitest';
import { Number } from './Number.js';
import { assertType, describeComparable, describeNumeric } from './testing.js';

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
  describeNumeric({ describe, it, expect })(Number, {
    abs: [
      { call: [-1], returns: 1 },
      { call: [0], returns: 0 },
      { call: [1], returns: 1 },
    ],
    sign: [
      { call: [-6], returns: -1 },
      { call: [0], returns: 0 },
      { call: [6], returns: 1 },
    ],
    '+': [
      { call: [1, 1], returns: 2 },
      { call: [1, -1], returns: 0 },
    ],
    '-': [
      { call: [1, 1], returns: 0 },
      { call: [1, -1], returns: 2 },
    ],
    '*': [
      { call: [1, 1], returns: 1 },
      { call: [2, 3], returns: 6 },
      { call: [3, 2], returns: 6 },
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
});
