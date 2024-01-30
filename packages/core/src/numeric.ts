/**
 * Basic numeric module
 */
export interface Numeric<T> {
  /**
   * Add operator
   *
   * @param left - the left operand
   * @param right - the right operand
   */
  '+'(left: T, right: T): T;
  /**
   * Subtract operator
   *
   * @param left - the left operand
   * @param right - the right operand
   */
  '-'(left: T, right: T): T;
  /**
   * Multiply operator
   *
   * @param left - the left operand
   * @param right - the right operand
   */
  '*'(left: T, right: T): T;
  /**
   * Absolute value
   *
   * @param value - the numeric value
   */
  abs(value: T): T;
  /**
   * Sign of a number. It should satisfy `Numeric['*'](Numeric.abs(x), Numeric.sign(x)) == x`
   *
   * @param value - the numeric value
   */
  sign(value: T): T;
}
