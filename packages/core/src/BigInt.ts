import { Comparable } from './Comparable.js';
import type { Numeric } from './Numeric.js';
import type { Option } from './Option.js';

const BigIntComparable = Comparable<bigint>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

const BigIntNumeric: Numeric<bigint> = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  abs: (value) => (value < 0n ? -value : value),
  sign: (value) => (value < 0n ? -1n : value > 0n ? 1n : 0n),
};

const BigIntFormat = {
  /**
   * Parse the expression and returns a bigint
   *
   * @example
   * ```ts
   * BigInt.parse('0b10101');// Option.Some(21n)
   * BigInt.parse('1024');// Option.Some(1024n)
   * BigInt.parse('0x123');// Option.Some(291n)
   * BigInt.parse('0x123');// Option.Some(291n)
   * BigInt.parse('invalid');// Option.None
   * ```
   * @param expression - the expression to parse
   */
  parse(expression: string): Option<bigint> {
    try {
      return globalThis.BigInt(expression);
    } catch {
      return undefined;
    }
  },

  /**
   * Return string representation of bigint using `radix`
   *
   * @example
   * ```typescript
   * BigInt.format(1024n, 10);// '1024'
   * BigInt.format(1024n, 16);// '400'
   * ```
   * @param self - an integer
   * @param radix - an optional base (ex: 10, 16)
   */
  format(self: bigint, radix?: number) {
    return self.toString(radix);
  },
};

/**
 * A collection of functions to manipulate `bigint`
 *
 * @example
 * ```typescript
 * import { BigInt } from '@w5s/core';
 *
 * const total = [1n, 2n, 3n].reduce(BigInt['+'], 0n);// 6n
 * BigInt['=='](total, 6n);// true
 * ```
 * @namespace
 */
export const BigInt = {
  ...BigIntComparable,
  ...BigIntNumeric,
  ...BigIntFormat,

  /**
   * Return true if `anyValue` is a `number`
   *
   * @example
   * ```typescript
   * BigInt.hasInstance(1) // true
   * BigInt.hasInstance(null)) // false
   * ```
   * @category Type
   * @param anyValue - a tested value
   */
  hasInstance(anyValue: unknown): anyValue is bigint {
    return typeof anyValue === 'bigint';
  },
};
