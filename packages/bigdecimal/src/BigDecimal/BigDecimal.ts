import { Callable } from '@w5s/core/dist/Callable.js';
import { Struct } from '@w5s/core/dist/Struct.js';
import { invariant } from '@w5s/invariant';
import type { Codec } from '@w5s/core';
import { of } from './of.js';
import { parse } from './parse.js';
import type { BigDecimalString } from '../BigDecimal.js';
import { format } from './format.js';

const BigDecimalStruct = Struct.define<BigDecimal>('BigDecimal');

const BigDecimalCodec: Codec<BigDecimal> = {
  codecEncode: (input) => `${format(input)}m`,
  codecDecode: (input, { ok, error }) => {
    if (typeof input === 'string' && input.endsWith('m')) {
      const parsed = parse(input.slice(0, -1));
      if (parsed != null) {
        return ok(parsed);
      }
    }
    return error(input, 'BigDecimal');
  },
  codecSchema: () => ({
    type: 'string',
    format: 'bigdecimal',
  }),
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

export const BigDecimal = Callable({
  ...BigDecimalStruct,
  ...BigDecimalCodec,
  [Callable.symbol]: ((value: string | bigint, scale?: number): BigDecimal =>
    typeof value === 'string'
      ? (parse(value) ?? invariant(false, `${String(value)} is not a valid BigDecimal`))
      : of(value, scale ?? 0)) as {
    (stringValue: BigDecimalString): BigDecimal;
    (value: bigint, scale?: number): BigDecimal;
  },
});
