import { describe, it, expect } from 'vitest';
import { BigInt } from './bigint.js';
import { assertType, describeComparable } from './testing.js';

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
});
