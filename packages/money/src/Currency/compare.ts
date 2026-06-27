import { compare as compareString } from '@w5s/core/String/compare';
import type { Ordering } from '@w5s/core/Ordering';
import type { Currency } from './Currency.js';

export function compare(left: Currency, right: Currency): Ordering {
  return compareString(left.code, right.code);
}
