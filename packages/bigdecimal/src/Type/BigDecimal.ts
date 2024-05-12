import { Struct } from '@w5s/core/dist/Struct.js';
import { invariant } from '@w5s/invariant';
import { of } from '../BigDecimal/of.js';
import { parse } from '../BigDecimal/parse.js';
import type { BigDecimalString } from '../BigDecimal.js';

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

export const BigDecimal = Struct.defineWith(
  'BigDecimal',
  (
    _
  ): {
    (stringValue: BigDecimalString): BigDecimal;
    (value: bigint, scale: number): BigDecimal;
  } =>
    (value: string | bigint, scale?: number): BigDecimal =>
      typeof value === 'string'
        ? parse(value) ?? invariant(false, `${String(value)} is not a valid BigDecimal`)
        : of(value, scale as number)
);
