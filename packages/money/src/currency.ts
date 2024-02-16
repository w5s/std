import type { Int } from '@w5s/core';
import { Struct } from '@w5s/core/dist/struct.js';
import { Comparable } from '@w5s/core/dist/comparable.js';

/**
 * Default rounding when omitted
 */
const defaultRounding = 0 as Int;
/**
 * Default precision when omitted
 */
const defaultPrecision = 2 as Int;

const CurrencyComparable = Comparable<Currency>({
  compare: (left, right) => (left.code === right.code ? 0 : left.code < right.code ? -1 : 1),
});
const CurrencyStruct = Struct.MakeGeneric(
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
      rounding: defaultRounding,
      precision: defaultPrecision,
      namePlural: parameters.name,
      symbolNative: parameters.symbol,
      ...parameters,
    })
);

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

/**
 * @namespace
 */
export const Currency = Object.assign(CurrencyStruct, {
  /**
   * Default rounding when omitted
   */
  defaultRounding,
  /**
   * Default precision when omitted
   */
  defaultPrecision,

  ...CurrencyComparable,
});
