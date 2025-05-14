import { compare as bigDecimalCompare } from '@w5s/bigdecimal/dist/BigDecimal/compare.js';
import type { Ordering } from '@w5s/core';
import { compare as currencyCompare } from '../Currency/compare.js';
import type { Money } from './Money.js';

export function compare(left: Money, right: Money): Ordering {
  const comparison = currencyCompare(left.currency, right.currency);
  return comparison === 0 ? bigDecimalCompare(left.amount, right.amount) : comparison;
}
