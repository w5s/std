import { Comparable } from './comparable.js';

const NumberComparable = Comparable<number>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

/**
 * A collection of functions to manipulate `number`
 *
 * @example
 * ```typescript
 * import { Number } from '@w5s/core';
 *
 * if (Number.hasInstance(unknownValue)) {
 *   // typeof unknownValue === 'number'
 *   Number['=='](unknownValue, unknownValue + 1);// false
 * }
 * ```
 * @namespace
 */
export const Number = {
  ...NumberComparable,

  /**
   * Return true if `anyValue` is a `number`
   *
   * @example
   * ```typescript
   * Number.hasInstance(1) // true
   * Number.hasInstance(null)) // false
   * ```
   * @category Guard
   * @param anyValue - a tested value
   */
  hasInstance(anyValue: unknown): anyValue is number {
    return typeof anyValue === 'number';
  },
};
