export interface Multiply<Left, Right = Left, Output = Left> {
  /**
   * Multiplication operator
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.Multiply<T> = ...;
   * const result = Numeric['*'](left, right);// represents (left * right)
   * ```
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '*'(left: Left, right: Right): Output;
}
