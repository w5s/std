export interface Multiply<Left, Right = Left, Return = Left> {
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
  '*'(left: Left, right: Right): Return;
}
