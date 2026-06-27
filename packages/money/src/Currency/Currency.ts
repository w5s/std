import { Struct } from '@w5s/core/Struct';
import { Symbol } from '@w5s/core/Symbol';
import type { Int } from '@w5s/core/Int';
import { Callable } from '@w5s/core/Callable';
import type { PartialKeys } from '@w5s/core-type';
import { defaultRounding } from './defaultRounding.js';
import { defaultPrecision } from './defaultPrecision.js';
import { CurrencyAsString } from './CurrencyAsString.js';

export interface Currency extends Struct<{
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

const CurrencyStruct = Struct.define<Currency>({
  typeName: 'Currency',
  [Symbol.inspect]: CurrencyAsString.asString,
  ...CurrencyAsString,
});

export const Currency = Callable({
  defaultRounding,
  defaultPrecision,
  ...CurrencyStruct,
  [Callable.symbol]: (parameters: Currency.Parameters): Currency =>
    CurrencyStruct.create({
      rounding: defaultRounding,
      precision: defaultPrecision,
      namePlural: parameters.name,
      symbolNative: parameters.symbol,
      ...parameters,
    }),
});

export namespace Currency {
  export interface Parameters extends PartialKeys<
    Struct.Parameters<Currency>,
    'namePlural' | 'precision' | 'rounding' | 'symbolNative'
  > {}
}
