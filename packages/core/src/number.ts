import type { Bounded } from './bounded.js';
import { Comparable } from './comparable.js';
import type { Numeric } from './numeric.js';

const NumberComparable = Comparable<number>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

const NumberBounded: Bounded<number> = {
  minValue: globalThis.Number.MIN_VALUE,
  maxValue: globalThis.Number.MAX_VALUE,
};

const NumberNumeric: Numeric<number> = {
  '+': (left: number, right: number) => left + right,
  '-': (left: number, right: number) => left - right,
  '*': (left: number, right: number) => left * right,
  abs: Math.abs,
  sign: Math.sign,
};

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
  ...NumberNumeric,
  ...NumberBounded,

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
