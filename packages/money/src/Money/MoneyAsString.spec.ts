import { BigDecimal } from '@w5s/bigdecimal';
import { describeAsString } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Currency } from '../Currency.js';
import { Money } from './Money.js';
import { MoneyAsString } from './MoneyAsString.js';

describe('MoneyAsString', () => {
  const EUR = Currency({ code: 'EUR', name: 'Euro', symbol: '€' });

  describeAsString(MoneyAsString, () => [
    // cases
    [Money({ amount: BigDecimal('1.10'), currency: EUR }), '1.10EUR'],
  ]);
});
