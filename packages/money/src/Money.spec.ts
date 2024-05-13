import { describe, expect, it } from 'vitest';
import { Result } from '@w5s/core';
import { ArgumentError } from '@w5s/error';
import { BigDecimal } from '@w5s/bigdecimal';
import { Currency } from './Currency.js';
import { Money } from './Money.js';

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
  const anyAmount = BigDecimal('1');
  const _1 = BigDecimal('1');
  const _2 = BigDecimal('2');
  const _3 = BigDecimal('3');
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

  describe('+', () => {
    it.each([
      [EUR(anyAmount), USD(anyAmount), Result.Error(ArgumentError({ message: 'Incompatible currencies EUR and USD' }))],
      [EUR(_1), EUR(_2), Result.Ok(EUR(_3))],
      [EUR(_2), EUR(_1), Result.Ok(EUR(_3))],
    ])('should return correct result', (left, right, expected) => {
      expect(Money['+'](left, right)).toEqual(expected);
    });
  });
  describe('-', () => {
    it.each([
      [EUR(anyAmount), USD(anyAmount), Result.Error(ArgumentError({ message: 'Incompatible currencies EUR and USD' }))],
      [EUR(_2), EUR(_1), Result.Ok(EUR(_1))],
      [EUR(_1), EUR(_2), Result.Ok(EUR(BigDecimal('-1')))],
    ])('should return correct result', (left, right, expected) => {
      expect(Money['-'](left, right)).toEqual(expected);
    });
  });
});
