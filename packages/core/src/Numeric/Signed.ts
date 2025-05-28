export interface Signed<T> {
  /**
   * Absolute value. It should satisfy `Numeric['*'](Numeric.abs(x), Numeric.sign(x)) == x`
   *
   * @example
   * ```typescript
   * type T = ...;
   * const TSigned: Numeric.Signed<T> = ...;
   * const result = TSigned.abs(value);// absolute value of (value)
   * ```
   * @category Numeric
   * @param value - the numeric value
   */
  abs(value: T): T;
  /**
   * Sign of a number. It should satisfy `TSigned['*'](TSigned.abs(x), TSigned.sign(x)) == x`
   *
   * @category Numeric
   * @param value - the numeric value
   */
  sign(value: T): T;
}
