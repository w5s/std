import type { Option } from '../Option.js';

export interface CheckedDivide<Base, Divider = Base, Output = Base> {
  /**
   * Division operator
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.CheckedDivide<T> = ...;
   * const result = Numeric['/?'](left, right);// represents (left / right)
   * ```
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '/?'(left: Base, right: Divider): Option<Output>;
}
