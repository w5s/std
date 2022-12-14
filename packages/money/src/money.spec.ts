import { describe, expect, it } from '@jest/globals';
import { ArgumentError, Result } from '@w5s/core';
import { Currency } from './currency.js';
import { describeComparable } from './describeComparable.js';
import { Money } from './money.js';

describe(Money, () => {
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
    name: 'Euro',
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

  describeComparable(Money, {
    base: () => EUR(anyAmount),
    inferior: () => [EUR(anyAmount - 1), Money({ currency: anyCurrency, amount: anyAmount })],
    superior: () => [EUR(anyAmount + 1), USD(anyAmount)],
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
