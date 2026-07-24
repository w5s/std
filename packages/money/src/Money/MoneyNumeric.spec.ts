import { BigDecimal, type BigDecimalString } from '@w5s/bigdecimal';
import { Result } from '@w5s/core';
import { ArgumentError } from '@w5s/error';
import { describe, expect, it } from 'vitest';

import { Currency } from '../Currency/Currency.js';
import { Money } from './Money.js';
import { MoneyNumeric } from './MoneyNumeric.js';

describe('MoneyNumeric', () => {
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
  const anyAmount = '1';
  const money = (currency: Currency, amount: BigDecimalString) => Money({ amount: BigDecimal(amount), currency });
  const EUR = (amount: BigDecimalString) => money(currencyEuro, amount);
  const USD = (amount: BigDecimalString) => money(currencyDollar, amount);

  describe('+', () => {
    it.each([
      [
        EUR(anyAmount),
        USD(anyAmount),
        Result.Error(new ArgumentError({ message: 'Incompatible currencies EUR and USD' })),
      ],
      [EUR('1'), EUR('2'), Result.Ok(EUR('3'))],
      [EUR('2'), EUR('1'), Result.Ok(EUR('3'))],
    ])('should return correct result', (left, right, expected) => {
      expect(MoneyNumeric['+'](left, right)).toEqual(expected);
    });
  });
  describe('-', () => {
    it.each([
      [
        EUR(anyAmount),
        USD(anyAmount),
        Result.Error(new ArgumentError({ message: 'Incompatible currencies EUR and USD' })),
      ],
      [EUR('2'), EUR('1'), Result.Ok(EUR('1'))],
      [EUR('1'), EUR('2'), Result.Ok(EUR('-1'))],
    ])('should return correct result', (left, right, expected) => {
      expect(MoneyNumeric['-'](left, right)).toEqual(expected);
    });
  });
  describe('*', () => {
    it.each([
      [EUR('2'), BigDecimal('2'), EUR('4')],
      [EUR('1.2'), BigDecimal('2.2'), EUR('2.64')],
    ])('should return correct result', (base, multiplier, expected) => {
      expect(MoneyNumeric['*'](base, multiplier)).toEqual(expected);
    });
  });
});
