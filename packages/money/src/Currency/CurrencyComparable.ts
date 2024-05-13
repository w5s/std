import { Comparable } from '@w5s/core/dist/Comparable.js';
import type { Currency } from './Currency.js';
import { compare } from './compare.js';

export const CurrencyComparable = Comparable<Currency>({
  compare,
});
