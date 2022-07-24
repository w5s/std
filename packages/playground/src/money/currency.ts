import { DataObject } from '@w5s/core/lib/dataObject.js';

export interface Currency
  extends DataObject<{
    _type: 'Currency';
    /**
     * Name
     */
    name: string;
    /**
     * Plural name
     */
    namePlural: string;
    /**
     * Code ISO3
     *
     * @example 'USD'
     */
    code: string;
    /**
     * Currency decimal digits after zero
     */
    decimalDigits: number;
    rounding: number;
    /**
     * Currency symbol
     *
     * @example '$'
     */
    symbol: string;
    symbolNative: string;
  }> {}
export const Currency = DataObject.MakeGeneric(
  'Currency',
  (create) =>
    (parameters: {
      name: Currency['name'];
      namePlural?: Currency['namePlural'];
      code: Currency['code'];
      decimalDigits?: Currency['decimalDigits'];
      rounding?: Currency['rounding'];
      symbol: Currency['symbol'];
      symbolNative?: Currency['symbolNative'];
    }): Currency =>
      create({
        rounding: 0,
        decimalDigits: 2,
        namePlural: parameters.name,
        symbolNative: parameters.symbol,
        ...parameters,
      })
);
