import { invariant } from '@w5s/invariant';
import { BigDecimal, type BigDecimalString } from '@w5s/bigdecimal';
import type { Currency } from './Currency.js';
import { CurrencyRegistry } from './CurrencyRegistry.js';
import type { Money } from './Money.js';

export function moneyFactory(
  currencyCode: Currency['code'],
  options?: {
    registry?: CurrencyRegistry;
  }
) {
  const currency = (options?.registry ?? CurrencyRegistry).getByCode(currencyCode);
  invariant(currency != null, `${currencyCode} is not valid currency code`);
  return (amount: Money['amount'] | BigDecimalString): Money => ({
    _: 'Money',
    currency,
    amount: typeof amount === 'string' ? BigDecimal(amount) : amount,
  });
}
