/**
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
