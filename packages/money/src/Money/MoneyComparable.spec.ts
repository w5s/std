import { BigDecimal } from '@w5s/bigdecimal';
import { describeComparable } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Currency } from '../Currency.js';
import { Money } from './Money.js';
import { MoneyComparable } from './MoneyComparable.js';

describe('MoneyComparable', () => {
  const currencyEuro = Currency({
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
  });
  const currencyDollar = Currency({
    code: 'USD',
    name: 'Dollar',
    symbol: '$',
  });
  const _0 = BigDecimal('0');
  const _1 = BigDecimal('1');
  const _2 = BigDecimal('2');
  const EUR = (amount: BigDecimal) => Money({ amount, currency: currencyEuro });
  const USD = (amount: BigDecimal) => Money({ amount, currency: currencyDollar });

  describeComparable(MoneyComparable, {
    equivalent: () => [[EUR(_1), EUR(_1)]],
    ordered: () => [
      // Money({ currency: anyCurrency, amount: anyAmount }),
      EUR(_0),
      EUR(_1),
      EUR(_2),
      USD(_1),
    ],
  });
});
