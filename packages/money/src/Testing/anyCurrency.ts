import { Currency } from '../Currency.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';

/**
 * A stub currency for testing purposes. It has a unique code, symbol, and name.
 */
export const anyCurrency = Currency({
  code: 'ANY',
  name: 'Any Currency',
  symbol: 'Ᾰ',
});

CurrencyRegistry.add(anyCurrency);
