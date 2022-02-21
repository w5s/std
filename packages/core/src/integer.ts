import type { Option } from './option.js';
import type { Tag } from './type.js';

// eslint-disable-next-line no-restricted-properties, prefer-exponentiation-operator
const MAX_SAFE_INTEGER = (Math.pow(2, 53) - 1) as Int;
const MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER as Int;

/**
 * Default Int implementation
 */
export type Int = Tag<number, { integral: true }>;

/**
 * @category Constructor
 * @param value
 */
export function Int(value: number): Int {
  return value < MIN_SAFE_INTEGER
    ? MIN_SAFE_INTEGER
    : value > MAX_SAFE_INTEGER
    ? MAX_SAFE_INTEGER
    : value < 0
    ? (Math.ceil(value) as Int)
    : (Math.floor(value) as Int);
}
export namespace Int {
  type Radix36 =
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36;

  /**
   * Alias to `Number.MAX_SAFE_INTEGER` (2**53-1)
   */
  export const max = MAX_SAFE_INTEGER;

  /**
   * Alias to `Number.MIN_SAFE_INTEGER` (-(2**53-1))
   */
  export const min = MIN_SAFE_INTEGER;

  /**
   * Returns `true` if anyValue is a safe integer
   *
   * @example
   * ```typescript
   * Int.hasInstance(0);// true
   * Int.hasInstance(-1);// true
   * Int.hasInstance(1.1);// false
   * Int.hasInstance(Int.max + 1);// false
   * ```
   * @category Guard
   * @param anyValue
   */
  export function hasInstance(anyValue: unknown): anyValue is Int {
    return Number.isSafeInteger(anyValue);
  }

  /**
   * Parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems).
   * If the `expression` is not valid, it returns `Option.None`
   *
   * @example
   * ```typescript
   * Int.parse('1');// Option.Some(1)
   * Int.parse('invalid');// Option.None
   * ```
   *
   * @param expression an integer expression
   * @param radix an optional base (ex: 10, 16)
   */
  export function parse(expression: string, radix?: Radix36): Option<Int> {
    /* eslint-disable unicorn/prefer-number-properties */
    const intValue = parseInt(expression, radix) as Int;

    return Number.isNaN(intValue) ? undefined : Int(intValue);
  }

  /**
   * Return string representation of integer
   *
   * @example
   * ```typescript
   * Int.stringify(Int(1), 10);// '1'
   * Int.stringify(Int(10), 16);// 'A'
   * ```
   *
   * @param intValue an integer
   * @param radix an optional base (ex: 10, 16)
   */
  export function stringify(intValue: Int, radix?: Radix36): string {
    return intValue.toString(radix);
  }
}
