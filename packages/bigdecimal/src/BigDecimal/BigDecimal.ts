import { Callable } from '@w5s/core/dist/Callable.js';
import { Struct } from '@w5s/core/dist/Struct.js';
import type { Codec } from '@w5s/core';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import { parse } from './parse.js';
import { asString } from './asString.js';
import { call } from './call.js';

const BigDecimalStruct = Struct.define<BigDecimal>({ typeName: 'BigDecimal' });

const BigDecimalCodec: Codec<BigDecimal> = {
  [Symbol.encode]: (input) => `${asString(input)}m`,
  [Symbol.decode]: (input, { ok, error }) => {
    if (typeof input === 'string' && input.endsWith('m')) {
      const parsed = parse(input.slice(0, -1));
      if (parsed != null) {
        return ok(parsed);
      }
    }
    return error(input, 'BigDecimal');
  },
  [Symbol.schema]: () => ({
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
  [Callable.symbol]: call,
});
