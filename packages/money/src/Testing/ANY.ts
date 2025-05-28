import { Currency } from '../Currency.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';
import { factory } from '../Money/factory.js';

const currencyAny = Currency({
  name: 'Any Currency',
  code: 'ANY',
  symbol: 'Ᾰ',
});
CurrencyRegistry.add(currencyAny);

/**
 * Return a new Money with a stub "ANY" currency
 *
 * @example
 * @param amount
 */
export const ANY = factory(currencyAny.code);
