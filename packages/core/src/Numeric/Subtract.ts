export interface Subtract<Left, Right = Left, Return = Left> {
  /**
   * Subtraction operator
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.Subtract<T> = ...;
   * const result = Numeric['-'](left, right);// represents (left - right)
   * ```
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '-'(left: Left, right: Right): Return;
}
