import { Comparable } from './comparable.js';
import type { Numeric } from './numeric.js';

const BigIntComparable = Comparable<bigint>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

const BigIntNumeric: Numeric<bigint> = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  abs: (value) => (value < 0n ? -value : value),
  sign: (value) => (value < 0n ? -1n : value > 0n ? 1n : 0n),
};

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
  ...BigIntNumeric,

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
