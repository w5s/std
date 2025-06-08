import type { BigDecimal } from '@w5s/bigdecimal';
import { Struct } from '@w5s/core/dist/Struct.js';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import type { Currency } from '../Currency/Currency.js';
import { parse } from './parse.js';
import { MoneyAsString } from './MoneyAsString.js';

export interface Money
  extends Struct<{
    [Struct.type]: 'Money';
    /**
     * Amount of currency
     */
    amount: BigDecimal;
    /**
     * Currency unit
     */
    currency: Currency;
  }> {}
export const Money = Struct.define<Money>({
  typeName: 'Money',
  [Symbol.encode]: (input) => MoneyAsString.asString(input),
  [Symbol.decode]: (input, { ok, error }) => {
    if (typeof input === 'string') {
      const parseResult = parse(input);
      if (parseResult != null) {
        return ok(parseResult);
      }
    }
    return error(input, 'Money');
  },
  [Symbol.schema]: () => ({
    type: 'string',
    format: 'money',
  }),
  [Symbol.inspect]: MoneyAsString.asString,
  ...MoneyAsString,
});
