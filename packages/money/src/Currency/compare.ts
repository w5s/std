import { compare as compareString } from '@w5s/core/dist/String/compare.js';
import type { Ordering } from '@w5s/core';
import type { Currency } from './Currency.js';

export function compare(left: Currency, right: Currency): Ordering {
  return compareString(left.code, right.code);
}
