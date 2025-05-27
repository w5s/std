import { invariant } from '@w5s/error/dist/invariant.js';
import { call as BigDecimal } from '@w5s/bigdecimal/dist/BigDecimal/call.js';
import type { BigDecimalString } from '@w5s/bigdecimal';
import type { Currency } from '../Currency/Currency.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';
import { Money } from './Money.js';

export function factory(
  currencyCode: Currency['code'],
  options?: {
    registry?: CurrencyRegistry;
  },
) {
  const currency = (options?.registry ?? CurrencyRegistry).getByCode(currencyCode);
  invariant(currency != null, `${currencyCode} is not valid currency code`);
  return (amount: Money['amount'] | BigDecimalString): Money => ({
    _: 'Money',
    currency,
    amount: typeof amount === 'string' ? BigDecimal(amount) : amount,
  });
}
