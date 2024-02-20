import type { Numeric, Option, Struct } from '@w5s/core';
import { Comparable } from '@w5s/core/dist/comparable.js';
import { Struct as StructValue } from '@w5s/core/dist/struct.js';
import { invariant } from '@w5s/invariant';

/**
 * Valid BigDecimal string representation
 */
export type BigDecimalString = `${number}`;

const bigIntSign = (value: bigint) => (value < 0n ? -1n : value > 0n ? 1n : 0n);
const bigIntAbs = (value: bigint) => (value <= 0n ? -value : value);
const bigIntCompare = (left: bigint, right: bigint) => (left === right ? 0 : left < right ? -1 : 1);
const create = (value: bigint, scale: number): BigDecimal => ({
  _: 'BigDecimal',
  value,
  scale,
});

const parse = (value: string): Option<BigDecimal> => {
  let digits: string;
  let scale: number;

  const dot = value.search(/\./);
  if (dot === -1) {
    digits = value;
    scale = 0;
  } else {
    const lead = value.slice(0, dot);
    const trail = value.slice(dot + 1);
    digits = `${lead}${trail}`;
    scale = trail.length;
  }

  if (digits === '') {
    return undefined;
  }

  if (!/^[+-]?\d+$/.test(digits)) {
    return undefined;
  }

  return create(BigInt(digits), scale);
};
const scaleValue = ({ value, scale }: BigDecimal, newScale: number): bigint =>
  newScale > scale
    ? value * 10n ** BigInt(newScale - scale)
    : newScale < scale
      ? value / 10n ** BigInt(scale - newScale)
      : value;
const scale = (value: BigDecimal, newScale: number): BigDecimal => {
  const newValue = scaleValue(value, newScale);
  return newValue === value.value ? value : create(newValue, newScale);
};
const combine2 = (combineFn: (left: bigint, right: bigint) => bigint) => (left: BigDecimal, right: BigDecimal) =>
  left.scale > right.scale
    ? create(combineFn(left.value, scaleValue(right, left.scale)), left.scale)
    : left.scale < right.scale
      ? create(combineFn(scaleValue(left, right.scale), right.value), right.scale)
      : create(combineFn(left.value, right.value), left.scale);

const BigDecimalStruct = StructValue.MakeGeneric(
  'BigDecimal',
  (
    _
  ): {
    (stringValue: BigDecimalString): BigDecimal;
    (value: bigint, scale: number): BigDecimal;
  } =>
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (value: string | bigint, scale?: number): BigDecimal =>
      typeof value === 'string'
        ? parse(value) ?? invariant(false, `${String(value)} is not a valid BigDecimal`)
        : create(value, scale as number)
);

const BigDecimalComparable: Comparable<BigDecimal> = Comparable({
  compare: (left, right) =>
    left.scale > right.scale
      ? bigIntCompare(left.value, scaleValue(right, left.scale))
      : left.scale < right.scale
        ? bigIntCompare(scaleValue(left, right.scale), right.value)
        : bigIntCompare(left.value, right.value),
});

const BigDecimalNumeric: Numeric<BigDecimal> = {
  '+': combine2((l, r) => l + r),
  '-': combine2((l, r) => l - r),
  '*': combine2((l, r) => l * r),
  abs: (value) => create(bigIntAbs(value.value), value.scale),
  sign: (value) => create(bigIntSign(value.value), 0),
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
});
