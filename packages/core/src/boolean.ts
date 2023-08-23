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
