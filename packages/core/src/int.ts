import type { Option } from './option.js';
import type { Tag } from './type.js';
import { Comparable } from './comparable.js';
import type { Bounded } from './bounded.js';
import type { Numeric } from './numeric.js';

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

// eslint-disable-next-line no-restricted-properties, prefer-exponentiation-operator
const MAX_SAFE_INTEGER = (Math.pow(2, 53) - 1) as Int;
const MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER as Int;
const toSafeInt = (value: number): Int =>
  value < MIN_SAFE_INTEGER
    ? MIN_SAFE_INTEGER
    : value > MAX_SAFE_INTEGER
      ? MAX_SAFE_INTEGER
      : value < 0
        ? (Math.ceil(value) as Int)
        : (Math.floor(value) as Int);

const IntComparable = Comparable<Int>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

const IntBounded: Bounded<Int> = {
  maxValue: MAX_SAFE_INTEGER,
  minValue: MIN_SAFE_INTEGER,
};

const IntNumeric: Numeric<Int> = {
  '+': (left, right) => toSafeInt(left + right),
  '-': (left, right) => toSafeInt(left - right),
  '*': (left, right) => toSafeInt(left * right),
  abs: Math.abs as Numeric<Int>['abs'],
  sign: Math.sign as Numeric<Int>['sign'],
};

/**
 * Integer value
 */
export type Int = Tag<number, { integral: true }>;

/**
 * A collection of functions to manipulate integer values
 *
 * @namespace
 */
export const Int = {
  ...IntComparable,
  ...IntBounded,
  ...IntNumeric,

  /**
   * Return a new integer from `value`
   *
   * @example
   * ```typescript
   * const intValue = Int.of(0.5);// 0
   * ```
   * @category Constructor
   * @param value - an initial numeric value
   */
  of(value: number): Int {
    return toSafeInt(value);
  },

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
   * @category Type
   * @param anyValue - a tested value
   */
  hasInstance(anyValue: unknown): anyValue is Int {
    return Number.isSafeInteger(anyValue);
  },

  /**
   * Parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems).
   * If the `expression` is not valid, it returns `Option.None`
   *
   * @example
   * ```typescript
   * Int.parse('1');// Option.Some(1)
   * Int.parse('invalid');// Option.None
   * ```
   * @param expression - an integer expression
   * @param radix - an optional base (ex: 10, 16)
   */
  parse(expression: string, radix?: Radix36): Option<Int> {
    /* eslint-disable unicorn/prefer-number-properties */
    const intValue = parseInt(expression, radix);

    return Number.isNaN(intValue) ? undefined : toSafeInt(intValue);
  },

  /**
   * Return string representation of integer
   *
   * @example
   * ```typescript
   * Int.stringify(Int.of(1), 10);// '1'
   * Int.stringify(Int.of(10), 16);// 'A'
   * ```
   * @param intValue - an integer
   * @param radix - an optional base (ex: 10, 16)
   */
  stringify(intValue: Int, radix?: Radix36): string {
    return intValue.toString(radix);
  },
};
