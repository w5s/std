import { invariant } from '@w5s/invariant';
import type { Currency } from './currency.js';
import { CurrencyRegistry } from './currencyRegistry.js';
import type { Money } from './money.js';

export function moneyFactory(
  currencyCode: Currency['code'],
  options?: {
    registry?: CurrencyRegistry;
  }
) {
  const currency = (options?.registry ?? CurrencyRegistry).getByCode(currencyCode);
  invariant(currency != null, `${currencyCode} is not valid currency code`);
  return (amount: Money['amount']): Money => ({ _: 'Money', currency, amount });
}
