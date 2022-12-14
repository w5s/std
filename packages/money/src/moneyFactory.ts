import { invariant } from '@w5s/core/lib/invariant.js';
import { Currency } from './currency.js';
import { CurrencyRegistry, currencyRegistry } from './currencyRegistry.js';
import { Amount, Money } from './money.js';

export function moneyFactory(
  currencyCode: Currency['code'],
  options?: {
    registry?: CurrencyRegistry;
  }
) {
  const currency = (options?.registry ?? currencyRegistry).getByCode(currencyCode);
  invariant(currency != null, `${currencyCode} is not valid currency code`);
  return (amount: Amount): Money => Money({ currency, amount });
}
