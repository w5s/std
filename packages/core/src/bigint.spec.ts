import { describe, it, expect } from 'vitest';
import { BigInt } from './bigint.js';
import { assertType, describeComparable, describeNumeric } from './testing.js';

describe('BigInt', () => {
  describe('.hasInstance', () => {
    it('should return true for number', () => {
      expect(BigInt.hasInstance(1n)).toEqual(true);
    });
    it('should return false for any other value', () => {
      expect(BigInt.hasInstance(null)).toBe(false);
      expect(BigInt.hasInstance({ length: 0 })).toBe(false);
    });
    it('should refine type', () => {
      const someValue = 1 as bigint | number;

      if (BigInt.hasInstance(someValue)) {
        assertType<typeof someValue, bigint>(true);
      } else {
        assertType<typeof someValue, number>(true);
      }
    });
  });

  describeComparable({ describe, it, expect })(BigInt, {
    ordered: () => [-1n, 0, 1n],
    equivalent: () => [
      [0n, 0n],
      [1n, 1n],
      [-2n, -2n],
    ],
  });
  describeNumeric({ describe, it, expect })(BigInt, {
    abs: [
      { call: [-1n], returns: 1n },
      { call: [0n], returns: 0n },
      { call: [1n], returns: 1n },
    ],
    sign: [
      { call: [-6n], returns: -1n },
      { call: [0n], returns: 0n },
      { call: [6n], returns: 1n },
    ],
    '+': [
      { call: [1n, 1n], returns: 2n },
      { call: [1n, -1n], returns: 0n },
    ],
    '-': [
      { call: [1n, 1n], returns: 0n },
      { call: [1n, -1n], returns: 2n },
    ],
    '*': [
      { call: [1n, 1n], returns: 1n },
      { call: [2n, 3n], returns: 6n },
      { call: [3n, 2n], returns: 6n },
    ],
  });
});
