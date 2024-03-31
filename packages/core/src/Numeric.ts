/**
 * Basic numeric module
 */
export interface Numeric<T> {
  /**
   * Addition operator
   *
   * @example
   * ```ts
   * type T = ...;
   * const TNumeric: Numeric<T> = ...;
   * const result = TNumeric['+'](left, right);// represents (left + right)
   * ```
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '+'(left: T, right: T): T;
  /**
   * Subtraction operator
   *
   * @example
   * ```ts
   * type T = ...;
   * const TNumeric: Numeric<T> = ...;
   * const result = Numeric['-'](left, right);// represents (left - right)
   * ```
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '-'(left: T, right: T): T;
  /**
   * Multiplication operator
   *
   * @example
   * ```ts
   * type T = ...;
   * const TNumeric: Numeric<T> = ...;
   * const result = Numeric['*'](left, right);// represents (left * right)
   * ```
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '*'(left: T, right: T): T;
  /**
   * Absolute value. It should satisfy `Numeric['*'](Numeric.abs(x), Numeric.sign(x)) == x`
   *
   * @example
   * ```ts
   * type T = ...;
   * const TNumeric: Numeric<T> = ...;
   * const result = Numeric.abs(value);// absolute value of (value)
   * ```
   * @category Numeric
   * @param value - the numeric value
   */
  abs(value: T): T;
  /**
   * Sign of a number. It should satisfy `Numeric['*'](Numeric.abs(x), Numeric.sign(x)) == x`
   *
   * @category Numeric
   * @param value - the numeric value
   */
  sign(value: T): T;
}
