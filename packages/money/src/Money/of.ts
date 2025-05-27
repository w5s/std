import type { BigDecimal } from '@w5s/bigdecimal';
import type { Money } from './Money.js';
import type { Currency } from '../Currency.js';

export function of(currency: Currency, amount: BigDecimal): Money {
  return { _: 'Money', amount, currency };
}
