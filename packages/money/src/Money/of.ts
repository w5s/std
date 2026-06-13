import type { BigDecimal } from '@w5s/bigdecimal/BigDecimal';
import { Money } from './Money.js';
import type { Currency } from '../Currency.js';

export function of(currency: Currency, amount: BigDecimal): Money {
  return Money.create({ amount, currency });
}
