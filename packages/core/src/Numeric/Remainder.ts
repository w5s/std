export interface Remainder<Base, Divider = Base, Output = Base> {
  /**
   * Remainder operator
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.Remainder<T> = ...;
   * const result = Numeric['%'](left, right);// represents (left % right)
   * ```
   * @category Numeric
   * @param left the left operand
   * @param right the right operand
   */
  '%'(this: void, left: Base, right: Divider): Output;
}
