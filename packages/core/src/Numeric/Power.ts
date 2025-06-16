export interface Power<Left, Right = Left, Output = Left> {
  /**
   * Power operator
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.Power<T> = ...;
   * const result = Numeric['**'](left, right);// represents (left ** right)
   * ```
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '**'(left: Left, right: Right): Output;
}
