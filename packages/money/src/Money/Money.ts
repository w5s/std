import type { BigDecimal } from '@w5s/bigdecimal';
import { Struct } from '@w5s/core/dist/Struct.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import type { Codec } from '@w5s/core';
import type { Currency } from '../Currency/Currency.js';
import { parse } from './parse.js';
import { asString } from './asString.js';

const MoneyStruct = Struct.define<Money>('Money');

const MoneyCodec: Codec<Money> = {
  codecEncode: (input) => asString(input),
  codecDecode: (input, { ok, error }) => {
    if (typeof input === 'string') {
      const parseResult = parse(input);
      if (parseResult != null) {
        return ok(parseResult);
      }
    }
    return error(input, 'Money');
  },
  codecSchema: () => ({
    type: 'string',
    format: 'money',
  }),
};

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
export const Money = Callable({ ...MoneyStruct, ...MoneyCodec });
