import { Comparable } from '@w5s/core/Comparable';
import type { Currency } from './Currency.js';
import { compare } from './compare.js';

export const CurrencyComparable = Comparable<Currency>({
  compare,
});
