import type { Option } from '../Option.js';

export interface CheckedMultiply<Base, Multiplier = Base, Output = Base> {
  /**
   * Multiplication operator that returns `None` instead of wrapping around on overflow.
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.CheckedMultiply<T> = ...;
   * const result = Numeric['*?'](left, right);// represents (left * right)
   * ```
   * @category Numeric
   * @param base - the left operand
   * @param multiplier - the right operand
   */
  '*?'(base: Base, multiplier: Multiplier): Option<Output>;
}
