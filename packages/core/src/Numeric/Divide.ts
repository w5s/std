export interface Divide<Base, Divider = Base, Output = Base> {
  /**
   * Division operator
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TNumeric: Numeric.Divide<T> = ...;
   * const result = Numeric['/'](left, right);// represents (left / right)
   * ```
   * @category Numeric
   * @param base - the base part
   * @param divider - the divider part
   */
  '/'(base: Base, divider: Divider): Output;
}
