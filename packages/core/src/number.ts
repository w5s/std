/**
 * @namespace
 */
export const Number = {
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
