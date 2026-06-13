import { invariant } from '@w5s/error/invariant';
import { call as BigDecimal } from '@w5s/bigdecimal/BigDecimal/call';
import type { BigDecimalString } from '@w5s/bigdecimal/BigDecimal';
import type { Currency } from '../Currency/Currency.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';
import { Money } from './Money.js';
import { of } from './of.js';

export function factory(
  currencyCode: Currency['code'],
  options?: {
    registry?: CurrencyRegistry;
  },
) {
  const currency = (options?.registry ?? CurrencyRegistry).getByCode(currencyCode);
  invariant(currency != null, `${currencyCode} is not valid currency code`);
  return (amount: Money['amount'] | BigDecimalString): Money =>
    of(currency, typeof amount === 'string' ? BigDecimal(amount) : amount);
}
