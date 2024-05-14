import { BigDecimal } from '@w5s/bigdecimal';
import { describe, it, expect } from 'vitest';
import { Result } from '@w5s/core';
import { ArgumentError } from '@w5s/error';
import { Money } from './Money.js';
import { Currency } from '../Currency/Currency.js';
import { MoneyNumeric } from './MoneyNumeric.js';

describe('MoneyNumeric', () => {
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
  const money = (currency = currencyEuro, amount = anyAmount) => Money({ currency, amount });
  const EUR = (amount = anyAmount) => money(currencyEuro, amount);
  const USD = (amount = anyAmount) => money(currencyDollar, amount);

  describe('+', () => {
    it.each([
      [EUR(anyAmount), USD(anyAmount), Result.Error(ArgumentError({ message: 'Incompatible currencies EUR and USD' }))],
      [EUR(_1), EUR(_2), Result.Ok(EUR(_3))],
      [EUR(_2), EUR(_1), Result.Ok(EUR(_3))],
    ])('should return correct result', (left, right, expected) => {
      expect(MoneyNumeric['+'](left, right)).toEqual(expected);
    });
  });
  describe('-', () => {
    it.each([
      [EUR(anyAmount), USD(anyAmount), Result.Error(ArgumentError({ message: 'Incompatible currencies EUR and USD' }))],
      [EUR(_2), EUR(_1), Result.Ok(EUR(_1))],
      [EUR(_1), EUR(_2), Result.Ok(EUR(BigDecimal('-1')))],
    ])('should return correct result', (left, right, expected) => {
      expect(MoneyNumeric['-'](left, right)).toEqual(expected);
    });
  });
});
