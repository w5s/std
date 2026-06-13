import type { Numeric } from '@w5s/core/Numeric';
import { BigDecimalNegate } from '@w5s/bigdecimal/BigDecimal/BigDecimalNegate';
import { Money } from './Money.js';

export const MoneyNegate: Numeric.Negate<Money> = {
  negate: ({ amount, currency }) => Money.create({ amount: BigDecimalNegate.negate(amount), currency }),
};
