import type { Int } from '@w5s/core';
import { DataObject } from '@w5s/core/dist/dataObject.js';
import { Comparable } from '@w5s/core/dist/comparable.js';

const CurrencyComparable = Comparable<Currency>({
  compare: (left, right) => (left.code === right.code ? 0 : left.code < right.code ? -1 : 1),
});

export interface Currency
  extends DataObject<{
    [DataObject.type]: 'Currency';
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
     * Currency precision
     */
    precision: Int;
    /**
     * Default rounding
     */
    rounding: Int;
    /**
     * Currency symbol
     *
     * @example '$'
     */
    symbol: string;
    /**
     * Currency native symbol
     *
     * @example '$'
     */
    symbolNative: string;
  }> {}
export const Currency = Object.assign(
  DataObject.MakeGeneric(
    'Currency',
    (_) =>
      (parameters: {
        name: Currency['name'];
        namePlural?: Currency['namePlural'];
        code: Currency['code'];
        precision?: Currency['precision'];
        rounding?: Currency['rounding'];
        symbol: Currency['symbol'];
        symbolNative?: Currency['symbolNative'];
      }): Currency => ({
        _,
        rounding: Currency.defaultRounding,
        precision: Currency.defaultPrecision,
        namePlural: parameters.name,
        symbolNative: parameters.symbol,
        ...parameters,
      })
  ),
  {
    /**
     * Default rounding when omitted
     */
    defaultRounding: 0 as Int,
    /**
     * Default precision when omitted
     */
    defaultPrecision: 2 as Int,

    ...CurrencyComparable,
  }
);
