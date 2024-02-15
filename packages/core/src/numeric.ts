/**
 * Basic numeric module
 */
export interface Numeric<T> {
  /**
   * Addition operator
   *
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '+'(left: T, right: T): T;
  /**
   * Subtraction operator
   *
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '-'(left: T, right: T): T;
  /**
   * Multiplication operator
   *
   * @category Numeric
   * @param left - the left operand
   * @param right - the right operand
   */
  '*'(left: T, right: T): T;
  /**
   * Absolute value
   *
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
