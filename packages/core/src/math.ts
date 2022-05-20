import type { Int } from './integer.js';

export namespace Math {
  const globalObject =
    typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : (undefined as never);
  const NativeMath = globalObject.Math;
  const alias = (name: keyof typeof NativeMath, nameAlias?: string) => {
    // @ts-expect-error Int is not assignable to number
    Math[nameAlias ?? name] = NativeMath[name];
  };

  /**
   * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
   * For example, the absolute value of -5 is the same as the absolute value of 5.
   *
   * @example
   * ```typescript
   * Math.abs(1);// 1
   * Math.abs(-1);// 1
   * ```
   * @param value
   */
  export declare function abs(value: Int): Int;
  export declare function abs(value: number): number;
  alias('abs');

  /**
   * Returns the greatest `Int` less than or equal to its numeric argument.
   *
   * @example
   * ```typescript
   * Math.floor(0.2);// 0
   * Math.floor(0.5);// 0
   * Math.floor(-0.5);// -1
   * ```
   * @param value - A numeric expression.
   */
  export declare function floor(value: number): Int;
  alias('floor');

  /**
   * Returns the smallest `Int` greater than or equal to its numeric argument.
   *
   * @example
   * ```typescript
   * Math.ceil(0.2);// 1
   * Math.ceil(0.5);// 1
   * Math.ceil(-0.5);// 0
   * ```
   * @param value - A numeric expression.
   */
  export declare function ceil(value: number): Int;
  alias('ceil');

  /**
   * Returns a supplied numeric expression rounded to the nearest `Int`.
   *
   * @example
   * ```typescript
   * Math.round(0.4);// 0
   * Math.round(0.5);// 1
   * Math.round(-0.5);// 0
   * Math.round(-0.6);// -1
   * ```
   * @param value - The value to be rounded to the nearest integer.
   */
  export declare function round(value: number): Int;
  alias('round');

  /**
   * Returns the integral part of the a numeric expression, `value`, removing any fractional digits.
   * If `value` is already an integer, the result is `value`.
   *
   * @example
   * ```typescript
   * Math.truncate(1);// 1
   * Math.truncate(1.3);// 1
   * Math.truncate(1.7);// 1
   * Math.truncate(-1.7);// -1
   * ```
   * @param value - A numeric expression.
   */
  export declare function truncate(value: number): Int;
  alias('trunc', 'truncate');
}
