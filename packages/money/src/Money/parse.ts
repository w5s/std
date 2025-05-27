import type { Option } from '@w5s/core';
import { parse as bigDecimalParse } from '@w5s/bigdecimal/dist/BigDecimal/parse.js';
import type { Money } from './Money.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';
import '../moneyFactory.all.js'; // Important : load well known currencies
import { of } from './of.js';

/**
 * Parses a string argument and returns a {@link Money}
 * If the `expression` is not valid, it returns `Option.None`
 *
 * @example
 * ```typescript
 * Money.parse('1.1EUR');// Option.Some(EUR('1.1'))
 * Money.parse('invalid');// Option.None
 * ```
 * @param expression - an number expression
 */
export function parse(expression: string): Option<Money> {
  const code = expression.slice(-3);
  const currency = CurrencyRegistry.getByCode(code);
  if (currency != null) {
    const amount = bigDecimalParse(expression.slice(0, -3));
    if (amount != null) {
      return of(currency, amount);
    }
  }

  return undefined;
}
