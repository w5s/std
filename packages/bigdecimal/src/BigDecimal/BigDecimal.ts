import { Callable } from '@w5s/core/Callable';
import { Struct } from '@w5s/core/Struct';
import { Symbol } from '@w5s/core/Symbol';

import { BigDecimalAsString } from './BigDecimalAsString.js';
import { call } from './call.js';
import { parse } from './parse.js';

const bigDecimalEncode = (self: BigDecimal) => `${BigDecimalAsString.asString(self)}m`;
const BigDecimalStruct = Struct.define<BigDecimal>({
  [Symbol.decode]: (input, { error, ok }) => {
    if (typeof input === 'string' && input.endsWith('m')) {
      const parsed = parse(input.slice(0, -1));
      if (parsed != null) {
        return ok(parsed);
      }
    }
    return error(input, 'BigDecimal');
  },
  [Symbol.encode]: bigDecimalEncode,
  [Symbol.inspect]: bigDecimalEncode,
  [Symbol.schema]: () => ({
    format: 'bigdecimal',
    type: 'string',
  }),
  typeName: 'BigDecimal',
  ...BigDecimalAsString,
});

/**
 * A BigDecimal is decimal number with a strict, fixed and safe precision (scale)
 */
export interface BigDecimal extends Struct<{
  _: 'BigDecimal';

  /**
   * The decimal scale N = value / (2 ** scale)
   */
  scale: number;

  /**
   * The base denominator
   */
  value: bigint;
}> {}

export const BigDecimal = Callable({
  ...BigDecimalStruct,
  [Callable.symbol]: call,
});
