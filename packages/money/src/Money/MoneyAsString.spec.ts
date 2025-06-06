import { describe } from 'vitest';
import { BigDecimal } from '@w5s/bigdecimal';
import { describeAsString } from '@w5s/core/dist/Testing.js';
import { MoneyAsString } from './MoneyAsString.js';
import { Money } from './Money.js';
import { Currency } from '../Currency.js';

describe('MoneyAsString', () => {
  const EUR = Currency({ code: 'EUR', symbol: '€', name: 'Euro' });

  describeAsString(MoneyAsString, () => [
    // cases
    [Money({ amount: BigDecimal('1.10'), currency: EUR }), '1.10EUR'],
  ]);
});
