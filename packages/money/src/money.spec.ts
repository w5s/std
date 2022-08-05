import { describe, expect, test } from '@jest/globals';
import { Currency } from './currency.js';
import { Money } from './money.js';

describe(Money, () => {
  const anyCurrency = Currency({
    name: 'Any',
    code: 'ANY',
    symbol: 'A',
  });
  const anyAmount = 1;
  test('should initialize Money', () => {
    expect(Money({ currency: anyCurrency, amount: anyAmount })).toEqual({
      _: 'Money',
      currency: anyCurrency,
      amount: anyAmount,
    });
  });
});
