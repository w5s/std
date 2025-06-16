import type { Option } from '../Option.js';

export interface CheckedSubtract<Left, Right = Left, Output = Left> {
  /**
   * Subtraction operator that returns `None` instead of wrapping around on overflow.
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.CheckedSubtract<T> = ...;
   * const result = TNumeric['-?'](left, right);// represents (left - right)
   * ```
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '-?'(left: Left, right: Right): Option<Output>;
}
