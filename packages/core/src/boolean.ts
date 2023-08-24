import { Comparable } from './comparable.js';

const BooleanComparable = Comparable<boolean>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

/**
 * A collection of functions to manipulate `boolean`
 *
 * @example
 * ```typescript
 * import { Boolean } from '@w5s/core';
 *
 * if (Boolean.hasInstance(unknownValue)) {
 *   // typeof unknownValue === 'boolean'
 * }
 * ```
 * @namespace
 */
export const Boolean = {
  ...BooleanComparable,

  /**
   * Return true if `anyValue` is a `boolean`
   *
   * @example
   * ```typescript
   * Boolean.hasInstance(false) // true
   * Boolean.hasInstance(null)) // false
   * ```
   * @category Guard
   * @param anyValue - a tested value
   */
  hasInstance(anyValue: unknown): anyValue is boolean {
    return typeof anyValue === 'boolean';
  },
};
