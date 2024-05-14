import { describe, expect, it } from 'vitest';
import { BigDecimal } from '@w5s/bigdecimal';
import { Money } from './Money.js';
import { Currency } from '../Currency/Currency.js';

describe(Money, () => {
  const anyCurrency = Currency({
    name: 'Any',
    code: 'ANY',
    symbol: 'A',
  });
  const anyAmount = BigDecimal('1');

  it('should initialize Money', () => {
    expect(Money({ currency: anyCurrency, amount: anyAmount })).toEqual({
      _: 'Money',
      currency: anyCurrency,
      amount: anyAmount,
    });
  });
});
