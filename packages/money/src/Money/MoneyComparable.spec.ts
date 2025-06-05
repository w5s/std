import { describeComparable } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { BigDecimal } from '@w5s/bigdecimal';
import { MoneyComparable } from './MoneyComparable.js';
import { Money } from './Money.js';
import { Currency } from '../Currency.js';

describe('MoneyComparable', () => {
  const currencyEuro = Currency({
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
  });
  const currencyDollar = Currency({
    name: 'Dollar',
    code: 'USD',
    symbol: '$',
  });
  const _0 = BigDecimal('0');
  const _1 = BigDecimal('1');
  const _2 = BigDecimal('2');
  const EUR = (amount: BigDecimal) => Money({ currency: currencyEuro, amount });
  const USD = (amount: BigDecimal) => Money({ currency: currencyDollar, amount });

  describeComparable(MoneyComparable, {
    ordered: () => [
      // Money({ currency: anyCurrency, amount: anyAmount }),
      EUR(_0),
      EUR(_1),
      EUR(_2),
      USD(_1),
    ],
    equivalent: () => [[EUR(_1), EUR(_1)]],
  });
});
