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

export const Money = DataObject.Make<Money>('Money');
