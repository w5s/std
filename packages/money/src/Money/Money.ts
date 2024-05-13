import type { BigDecimal } from '@w5s/bigdecimal';
import { Struct } from '@w5s/core/dist/Struct.js';
import type { Currency } from '../Currency/Currency.js';

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
export const Money = Struct.define<Money>('Money');
