export interface Add<Left, Right = Left, Output = Left> {
  /**
   * Addition operator
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.Add<T> = ...;
   * const result = TNumeric['+'](left, right);// represents (left + right)
   * ```
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '+'(left: Left, right: Right): Output;
}
