import type { BigDecimal } from '@w5s/bigdecimal';

import type { Currency } from '../Currency.js';

import { Money } from './Money.js';

export function of(currency: Currency, amount: BigDecimal): Money {
  return Money.create({ amount, currency });
}
