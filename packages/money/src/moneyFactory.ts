import { Currency } from './currency.js';
import { CurrencyRegistry, currencyRegistry } from './currencyRegistry.js';
import { Amount, Money } from './money.js';

export function moneyFactory(
  currencyParameters: Parameters<typeof Currency>['0'],
  options?: {
    registry?: CurrencyRegistry;
  }
) {
  const currency = Currency(currencyParameters);
  // Register
  (options?.registry ?? currencyRegistry).add(currency);
  return (amount: Amount): Money => Money({ currency, amount });
}
