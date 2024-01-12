import { describe, expect, it } from 'vitest';
import { Result } from '@w5s/core';
import { ArgumentError } from '@w5s/error';
import { describeComparable } from '@w5s/core/dist/testing.js';
import { Currency } from './currency.js';
import { Money } from './money.js';

describe('Money', () => {
  const anyCurrency = Currency({
    name: 'Any',
    code: 'ANY',
    symbol: 'A',
  });
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
  const anyAmount = 1;
  const money = (currency = anyCurrency, amount = anyAmount) => Money({ currency, amount });
  const EUR = (amount = anyAmount) => money(currencyEuro, amount);
  const USD = (amount = anyAmount) => money(currencyDollar, amount);

  it('should initialize Money', () => {
    expect(Money({ currency: anyCurrency, amount: anyAmount })).toEqual({
      _: 'Money',
      currency: anyCurrency,
      amount: anyAmount,
    });
  });

  describeComparable({ describe, expect, it })(Money, {
    ordered: () => [
      // Money({ currency: anyCurrency, amount: anyAmount }),
      EUR(anyAmount - 1),
      EUR(anyAmount),
      EUR(anyAmount + 1),
      USD(anyAmount),
    ],
    equivalent: () => [[EUR(anyAmount), EUR(anyAmount)]],
  });

  describe('+', () => {
    it.each([
      [EUR(anyAmount), USD(anyAmount), Result.Error(ArgumentError({ message: 'Incompatible currencies EUR and USD' }))],
      [EUR(1), EUR(2), Result.Ok(EUR(3))],
      [EUR(2), EUR(1), Result.Ok(EUR(3))],
    ])('should return correct result', (left, right, expected) => {
      expect(Money['+'](left, right)).toEqual(expected);
    });
  });
  describe('-', () => {
    it.each([
      [EUR(anyAmount), USD(anyAmount), Result.Error(ArgumentError({ message: 'Incompatible currencies EUR and USD' }))],
      [EUR(2), EUR(1), Result.Ok(EUR(1))],
      [EUR(1), EUR(2), Result.Ok(EUR(-1))],
    ])('should return correct result', (left, right, expected) => {
      expect(Money['-'](left, right)).toEqual(expected);
    });
  });
});
