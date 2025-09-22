/* eslint-disable no-bitwise */
// see https://github.com/facebook/immutable-js/blob/master/src/Hash.js

import type { Int } from '@w5s/core';

const INT32_MASK = 0xff_ff_ff_ff;
const ZERO = 0 as Int;
const TRUE = 0x42_10_84_21 as Int;
const FALSE = 0x42_10_84_20 as Int;
const UNDEFINED = 0x42_10_84_23 as Int;
const NULL = 0x42_10_84_22 as Int;

function int32SMI(i32: number): Int {
  return (((i32 >>> 1) & 0x40_00_00_00) | (i32 & 0xbf_ff_ff_ff)) as Int;
}

function hashNumber(value: number): Hash.Value {
  // eslint-disable-next-line no-self-compare
  if (value !== value || value === Number.POSITIVE_INFINITY) {
    return ZERO;
  }

  // eslint-disable-next-line unicorn/prefer-math-trunc
  let returnValue = value | 0;
  if (returnValue !== value) {
    returnValue ^= value * INT32_MASK;
  }

  let currentValue = value;
  while (currentValue > INT32_MASK) {
    currentValue /= INT32_MASK;
    returnValue ^= value;
  }

  return int32SMI(returnValue);
}

function hashString(str: string): Hash.Value {
  // This is the hash from JVM
  // The hash code for a string is computed as
  // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
  // where s[i] is the ith character of the string and n is the length of
  // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
  // (exclusive) by dropping high bits.
  let hashValue = 0;
  for (let index = 0, { length } = str; index < length; index += 1) {
    // eslint-disable-next-line unicorn/prefer-code-point,unicorn/prefer-math-trunc
    hashValue = (31 * hashValue + str.charCodeAt(index)) | 0;
  }

  return int32SMI(hashValue);
}

/**
 * @namespace
 */
export const Hash = {
  /**
   * Combine two hash codes together
   *
   * @example
   * ```typescript
   * HashCode.combine(HashCode.from(...), HashCode.from(...))
   * ```
   * @param left - hash code
   * @param right - hash code
   */
  combine(left: Hash.Value, right: Hash.Value): Hash.Value {
    return int32SMI(left ^ ((right as number) + 0x9e_37_79_b9 + (left << 6) + (left >> 2)));
  },
  /**
   * Return a hash number from `anyValue`
   *
   * @example
   * ```typescript
   * Hash.from(undefined); //0x42108423
   * Hash.from(true); //0x42108421
   * Hash.from('foo-bar'); //-682120564
   * ```
   * @category Constructor
   * @param anyValue - hashed value
   */
  from(anyValue: undefined | null | boolean | number | string): Hash.Value {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (typeof anyValue) {
      case 'boolean': {
        return anyValue ? TRUE : FALSE;
      }
      case 'number': {
        return hashNumber(anyValue);
      }
      case 'undefined': {
        return UNDEFINED;
      }
      case 'string': {
        return hashString(anyValue);
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (anyValue === null) {
          return NULL;
        }

        return ZERO;
      }
    }
  },
};

export namespace Hash {
  export type Value = Int;
}
