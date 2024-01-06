import { Comparable } from './comparable.js';

const BigIntComparable = Comparable<bigint>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

/**
 * A collection of functions to manipulate `number`
 *
 * @example
 * ```typescript
 * import { BigInt } from '@w5s/core';
 *
 * if (BigInt.hasInstance(unknownValue)) {
 *   // typeof unknownValue === 'number'
 *   BigInt['=='](unknownValue, unknownValue + 1);// false
 * }
 * ```
 * @namespace
 */
export const BigInt = {
  ...BigIntComparable,

  /**
   * Return true if `anyValue` is a `number`
   *
   * @example
   * ```typescript
   * BigInt.hasInstance(1) // true
   * BigInt.hasInstance(null)) // false
   * ```
   * @category Guard
   * @param anyValue - a tested value
   */
  hasInstance(anyValue: unknown): anyValue is bigint {
    return typeof anyValue === 'bigint';
  },
};
