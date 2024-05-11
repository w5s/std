/* eslint-disable @typescript-eslint/no-shadow */
import type { Numeric } from '@w5s/core';
import { Struct } from '@w5s/core/dist/Struct.js';
import { invariant } from '@w5s/invariant';
import { format } from './BigDecimal/format.js';
import { parse } from './BigDecimal/parse.js';
import { BigDecimalComparable } from './BigDecimal/BigIntComparable.js';
import { scaleValue } from './BigDecimal/scaleValue.js';
import { of } from './BigDecimal/of.js';
/**
 * Valid BigDecimal string representation
 */
export type BigDecimalString = `${number}`;

const toString = String;
const bigIntSign = (value: bigint) => (value < 0n ? -1n : value > 0n ? 1n : 0n);
const bigIntAbs = (value: bigint) => (value <= 0n ? -value : value);

function scale(value: BigDecimal, newScale: number): BigDecimal {
  if (value.scale === newScale) {
    return value;
  }
  const newValue = scaleValue(value, newScale);
  return newValue === value.value ? value : of(newValue, newScale);
}

function combine2(combineFn: (left: bigint, right: bigint) => bigint) {
  return (left: BigDecimal, right: BigDecimal) =>
    left.scale > right.scale
      ? of(combineFn(left.value, scaleValue(right, left.scale)), left.scale)
      : left.scale < right.scale
        ? of(combineFn(scaleValue(left, right.scale), right.value), right.scale)
        : of(combineFn(left.value, right.value), left.scale);
}

const BigDecimalStruct = Struct.defineWith(
  'BigDecimal',
  (
    _
  ): {
    (stringValue: BigDecimalString): BigDecimal;
    (value: bigint, scale: number): BigDecimal;
  } =>
    (value: string | bigint, scale?: number): BigDecimal =>
      typeof value === 'string'
        ? parse(value) ?? invariant(false, `${toString(value)} is not a valid BigDecimal`)
        : of(value, scale as number)
);

const BigDecimalNumeric: Numeric<BigDecimal> = {
  '+': combine2((l, r) => l + r),
  '-': combine2((l, r) => l - r),
  '*': combine2((l, r) => l * r),
  abs: (value) => of(bigIntAbs(value.value), value.scale),
  sign: (value) => of(bigIntSign(value.value), 0),
};

/**
 * A BigDecimal is decimal number with a strict, fixed and safe precision (scale)
 */
export interface BigDecimal
  extends Struct<{
    _: 'BigDecimal';
    /**
     * The base denominator
     */
    value: bigint;
    /**
     * The decimal scale N = value / (2 ** scale)
     */
    scale: number;
  }> {}

/**
 * A collection of functions to manipulate `BigDecimal`
 *
 * @namespace
 */
export const BigDecimal = Object.assign(BigDecimalStruct, {
  ...BigDecimalComparable,
  ...BigDecimalNumeric,

  /**
   * Scales a given `BigDecimal` to the specified scale.
   *
   * @example
   * ```ts
   * const value = BigDecimal('1.02');
   * BigDecimal.scale(value, 1); //  BigDecimal('1.0')
   * BigDecimal.scale(value, 3); //  BigDecimal('1.020')
   * ```
   *
   * @param value - The `BigDecimal` to scale.
   * @param scale - The new scale
   */
  scale,

  /**
   * Returns a normalized `value`
   *
   * @example
   * ```ts
   * BigDecimal.normalize(BigDecimal('1.020')); //  BigDecimal('1.02')
   * BigDecimal.normalize(BigDecimal('1.0200')); //  BigDecimal('1.02')
   * ```
   * @param value
   */
  normalize(value: BigDecimal) {
    const digits = toString(value.value);
    let trail = 0;
    for (let i = digits.length - 1; i >= 0; i -= 1) {
      if (digits[i] === '0') {
        trail += 1;
      } else {
        break;
      }
    }

    if (trail === 0) {
      return value;
    }
    return scale(value, value.scale - trail);
  },
  of,
  parse,
  format,
});
