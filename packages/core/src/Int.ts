import type { Option } from './Option.js';
import { Int as IntType } from './Type/Int.js';
import { Comparable } from './Comparable.js';
import type { Bounded } from './Bounded.js';
import type { Numeric } from './Numeric.js';
import type { Tag } from './Tag.js';
import type { Radix36 } from './typing.js';

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

const IntFormat = {
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
   * Int.format(Int.of(1), 10);// '1'
   * Int.format(Int.of(10), 16);// 'A'
   * ```
   * @param intValue - an integer
   * @param radix - an optional base (ex: 10, 16)
   */
  format(intValue: Int, radix?: Radix36): string {
    return intValue.toString(radix);
  },
};

/**
 * Integer value
 */
export type Int = number & Tag<'Int'>;

/**
 * A collection of functions to manipulate integer values
 *
 * @namespace
 */
export const Int = Object.assign(IntType, {
  ...IntComparable,
  ...IntBounded,
  ...IntNumeric,
  ...IntFormat,

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
});
