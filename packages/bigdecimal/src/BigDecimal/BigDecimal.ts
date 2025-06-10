import { Callable } from '@w5s/core/dist/Callable.js';
import { Struct } from '@w5s/core/dist/Struct.js';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import { parse } from './parse.js';
import { BigDecimalAsString } from './BigDecimalAsString.js';
import { call } from './call.js';

const bigDecimalEncode = (self: BigDecimal) => `${BigDecimalAsString.asString(self)}m`;
const BigDecimalStruct = Struct.define<BigDecimal>({
  typeName: 'BigDecimal',
  [Symbol.encode]: bigDecimalEncode,
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
  [Symbol.inspect]: bigDecimalEncode,
  ...BigDecimalAsString,
});

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
  [Callable.symbol]: call,
});
