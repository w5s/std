import type { PartialKeys } from '@w5s/core-type';
import type { Int } from '@w5s/core/Int';

import { Callable } from '@w5s/core/Callable';
import { Struct } from '@w5s/core/Struct';
import { Symbol } from '@w5s/core/Symbol';

import { CurrencyAsString } from './CurrencyAsString.js';
import { defaultPrecision } from './defaultPrecision.js';
import { defaultRounding } from './defaultRounding.js';

export interface Currency extends Struct<{
  [Struct.type]: 'Currency';

  /**
   * Code ISO3
   *
   * @example 'USD'
   */
  code: string;

  /**
   * Name
   */
  name: string;

  /**
   * Plural name
   */
  namePlural: string;

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
  [Symbol.inspect]: CurrencyAsString.asString,
  typeName: 'Currency',
  ...CurrencyAsString,
});

export const Currency = Callable({
  defaultPrecision,
  defaultRounding,
  ...CurrencyStruct,
  [Callable.symbol]: (parameters: Currency.Parameters): Currency =>
    CurrencyStruct.create({
      namePlural: parameters.name,
      precision: defaultPrecision,
      rounding: defaultRounding,
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
