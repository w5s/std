import type { Money } from './Money.js';
import { of } from './of.js';

export function __mapAmount(self: Money, fn: (amount: Money['amount']) => Money['amount']): Money {
  const { amount } = self;
  const amountNew = fn(amount);

  return amount === amountNew ? self : of(self.currency, amountNew);
}
