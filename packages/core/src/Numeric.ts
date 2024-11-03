import type { Option } from './Option.js';

export namespace Numeric {
  export interface Signed<T> {
    /**
     * Absolute value. It should satisfy `Numeric['*'](Numeric.abs(x), Numeric.sign(x)) == x`
     *
     * @example
     * ```ts
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

  export interface CheckedAdd<Left, Right = Left, Return = Left> {
    /**
     * Addition operator that returns `None` instead of wrapping around on overflow.
     *
     * @example
     * ```ts
     * type T = ...;
     * const TNumeric: Numeric.CheckedAdd<T> = ...;
     * const result = TNumeric['+?'](left, right);// represents (left + right)
     * ```
     * @category Numeric
     * @param left - the left operand
     * @param right - the right operand
     */
    '+?'(left: Left, right: Right): Option<Return>;
  }
  export interface CheckedSubtract<Left, Right = Left, Return = Left> {
    /**
     * Subtraction operator that returns `None` instead of wrapping around on overflow.
     *
     * @example
     * ```ts
     * type T = ...;
     * const TNumeric: Numeric.CheckedSubtract<T> = ...;
     * const result = TNumeric['-?'](left, right);// represents (left + right)
     * ```
     * @category Numeric
     * @param left - the left operand
     * @param right - the right operand
     */
    '-?'(left: Left, right: Right): Option<Return>;
  }

  export interface CheckedMultiply<Base, Multiplier = Base, Return = Base> {
    /**
     * Multiplication operator that returns `None` instead of wrapping around on overflow.
     *
     * @example
     * ```ts
     * type T = ...;
     * const TNumeric: Numeric.CheckedMultiply<T> = ...;
     * const result = Numeric['*?'](left, right);// represents (left * right)
     * ```
     * @category Numeric
     * @param base - the left operand
     * @param multiplier - the right operand
     */
    '*?'(base: Base, multiplier: Multiplier): Option<Return>;
  }

  export interface CheckedDivide<Base, Divider = Base, Return = Base> {
    /**
     * Division operator
     *
     * @example
     * ```ts
     * type T = ...;
     * const TNumeric: Numeric.CheckedDivide<T> = ...;
     * const result = Numeric['/?'](left, right);// represents (left / right)
     * ```
     * @category Numeric
     * @param left - the left operand
     * @param right - the right operand
     */
    '/?'(left: Base, right: Divider): Option<Return>;
  }

  export interface Add<Left, Right = Left, Return = Left> {
    /**
     * Addition operator
     *
     * @example
     * ```ts
     * type T = ...;
     * const TNumeric: Numeric.Add<T> = ...;
     * const result = TNumeric['+'](left, right);// represents (left + right)
     * ```
     * @category Numeric
     * @param left - the left operand
     * @param right - the right operand
     */
    '+'(left: Left, right: Right): Return;
  }

  export interface Subtract<Left, Right = Left, Return = Left> {
    /**
     * Subtraction operator
     *
     * @example
     * ```ts
     * type T = ...;
     * const TNumeric: Numeric.Subtract<T> = ...;
     * const result = Numeric['-'](left, right);// represents (left - right)
     * ```
     * @category Numeric
     * @param left - the left operand
     * @param right - the right operand
     */
    '-'(left: Left, right: Right): Return;
  }

  export interface Multiply<Left, Right = Left, Return = Left> {
    /**
     * Multiplication operator
     *
     * @example
     * ```ts
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

  export interface Divide<Base, Divider = Base, Return = Base> {
    /**
     * Division operator
     *
     * @example
     * ```ts
     * type T = ...;
     * const TNumeric: Numeric.Divide<T> = ...;
     * const result = Numeric['/'](left, right);// represents (left / right)
     * ```
     * @category Numeric
     * @param base - the base part
     * @param divider - the divider part
     */
    '/'(base: Base, divider: Divider): Return;
  }
}
