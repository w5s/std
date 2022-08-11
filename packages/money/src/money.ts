import { DataObject } from '@w5s/core/lib/dataObject.js';
import { Currency } from './currency.js';

export type Amount = number;

export interface Money
  extends DataObject<{
    [DataObject.type]: 'Money';
    /**
     * Amount of currency
     */
    amount: Amount;
    /**
     * Currency unit
     */
    currency: Currency;
  }> {}

export const Money = Object.assign(DataObject.Make<Money>('Money'), {
  /**
   * @example
   * ```typescript
   * const oneEuro = EUR(1);
   * Money['=='](oneEuro, EUR(2));// false
   * Money['=='](oneEuro, USD(1));// false
   * Money['=='](oneEuro, EUR(1));// true
   * ```
   * @param left - Left operand currency
   * @param right - Right operand currency
   */
  '==': (left: Money, right: Money) => left.amount === right.amount && Currency['=='](left.currency, right.currency),
});
