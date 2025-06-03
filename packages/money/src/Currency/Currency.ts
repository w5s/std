import { Struct } from '@w5s/core/dist/Struct.js';
import type { Int } from '@w5s/core';
import { Callable } from '@w5s/core/dist/Callable.js';
import { defaultRounding } from './defaultRounding.js';
import { defaultPrecision } from './defaultPrecision.js';

export interface Currency
  extends Struct<{
    [Struct.type]: 'Currency';
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

const CurrencyStruct = Struct.define<Currency>({ typeName: 'Currency' });

export const Currency = Callable({
  defaultRounding,
  defaultPrecision,
  ...CurrencyStruct,
  [Callable.symbol]: (parameters: {
    name: Currency['name'];
    namePlural?: Currency['namePlural'];
    code: Currency['code'];
    precision?: Currency['precision'];
    rounding?: Currency['rounding'];
    symbol: Currency['symbol'];
    symbolNative?: Currency['symbolNative'];
  }): Currency =>
    CurrencyStruct.create({
      rounding: defaultRounding,
      precision: defaultPrecision,
      namePlural: parameters.name,
      symbolNative: parameters.symbol,
      ...parameters,
    }),
});
