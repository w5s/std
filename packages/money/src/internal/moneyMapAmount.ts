import type { Money } from '../Money/Money.js';

import { of } from '../Money/of.js';

export function moneyMapAmount(self: Money, fn: (amount: Money['amount']) => Money['amount']): Money {
  const { amount } = self;
  const amountNew = fn(amount);

  return amount === amountNew ? self : of(self.currency, amountNew);
}
