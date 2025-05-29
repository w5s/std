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
  abs(this: void, value: T): T;
  /**
   * Returns true if the number is positive and false if the number is zero or negative.
   *
   * @category Numeric
   * @param self - the numeric value
   */
  isPositive(this: void, self: T): boolean;
  /**
   * Returns true if the number is negative and false if the number is zero or positive.
   *
   * @category Numeric
   * @param self - the numeric value
   */
  isNegative(this: void, self: T): boolean;
  /**
   * Sign of a number. It should satisfy `TSigned['*'](TSigned.abs(x), TSigned.sign(x)) == x`
   *
   * @category Numeric
   * @param value - the numeric value
   */
  sign(this: void, value: T): T;
}
