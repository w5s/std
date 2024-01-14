import type { Option } from '@w5s/core';
import { DataObject } from '@w5s/core/dist/dataObject.js';
import { invariant } from '@w5s/invariant';

const create = (value: bigint, scale: number): BigDecimal => ({ _: 'BigDecimal', value, scale });
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
    // TODO: This mimics the BigInt constructor behavior. Should this be `Option.none()`?
    // return zero;
    return undefined;
  }

  if (!/^[+-]?\d+$/.test(digits)) {
    return undefined;
  }

  return create(BigInt(digits), scale);
};
const scale = (value: BigDecimal, newScale: number): BigDecimal =>
  newScale > value.scale
    ? create(value.value * 10n ** BigInt(newScale - value.scale), newScale)
    : newScale < value.scale
      ? create(value.value / 10n ** BigInt(value.scale - newScale), newScale)
      : value;

const BigDecimalStruct = DataObject.MakeGeneric(
  'BigDecimal',
  (
    _
  ): {
    (stringValue: string): BigDecimal;
    (value: bigint, scale: number): BigDecimal;
  } =>
    (value: string | bigint, scaleValue?: number): BigDecimal =>
      typeof value === 'string'
        ? parse(value) ?? invariant(false, `${String(value)} is not a valid BigDecimal`)
        : create(value, scaleValue as number)
);

/**
 * A BigDecimal is decimal number with a strict, fixed and safe precision (scale)
 */
export interface BigDecimal
  extends DataObject<{
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
