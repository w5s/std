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
export const BigDecimal = Object.assign(
  DataObject.MakeGeneric(
    'BigDecimal',
    (
      _
    ): {
      (stringValue: string): BigDecimal;
      (value: bigint, scale: number): BigDecimal;
    } =>
      (value: string | bigint, scale?: number): BigDecimal =>
        typeof value === 'string'
          ? parse(value) ?? invariant(false, `${String(value)} is not a valid BigDecimal`)
          : create(value, scale as number)
  ),
  {}
);
