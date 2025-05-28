import type { Numeric } from '@w5s/core';
import { BigDecimalNegate } from '@w5s/bigdecimal/dist/BigDecimal/BigDecimalNegate.js';
import { Money } from './Money.js';

export const MoneyNegate: Numeric.Negate<Money> = {
  negate: ({ amount, currency }) => Money.create({ amount: BigDecimalNegate.negate(amount), currency }),
};
