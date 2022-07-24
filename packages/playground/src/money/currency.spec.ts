import { describe, expect, test } from '@jest/globals';
import { Currency } from './currency.js';

describe('Currency', () => {
  const anyProperties = {
    name: 'Name',
    namePlural: 'Name plural',
    decimalDigits: 2,
    code: 'EUR',
    rounding: 0,
    symbol: '$',
    symbolNative: '$',
  };
  const omitProperty = <V, N extends keyof V>(parameters: V, name: N): Omit<V, N> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [name]: _, ...rest } = parameters;
    return rest;
  };
  test('should initialize Currency', () => {
    expect(Currency(anyProperties)).toEqual({
      _type: 'Currency',
      ...anyProperties,
    });
  });

  test('should have default rounding', () => {
    const parameters = omitProperty(anyProperties, 'rounding');
    expect(Currency(parameters)).toEqual(
      Currency({
        ...parameters,
        rounding: 0,
      })
    );
  });
  test('should have default decimalDigits', () => {
    const parameters = omitProperty(anyProperties, 'decimalDigits');

    expect(Currency(parameters)).toEqual(
      Currency({
        ...parameters,
        decimalDigits: 2,
      })
    );
  });
  test('should have default symbolNative to symbol', () => {
    const parameters = omitProperty(anyProperties, 'symbolNative');
    const symbol = 'A';

    expect(Currency({ ...parameters, symbol })).toEqual(
      Currency({
        ...parameters,
        symbol,
        symbolNative: symbol,
      })
    );
  });
  test('should have default namePlural to name', () => {
    const parameters = omitProperty(anyProperties, 'namePlural');
    const name = 'Name test';

    expect(Currency({ ...parameters, name })).toEqual(
      Currency({
        ...parameters,
        name,
        namePlural: name,
      })
    );
  });
});
