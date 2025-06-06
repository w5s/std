import { describe, it, expect } from 'vitest';
import { Currency } from './Currency.js';
import { CurrencyAsString } from './Currency/CurrencyAsString.js';
import { CurrencyComparable } from './Currency/CurrencyComparable.js';

describe('Currency', () => {
  it('should create a currency', () => {
    expect(Currency).toEqual(expect.objectContaining(CurrencyAsString));
    expect(Currency).toEqual(expect.objectContaining(CurrencyComparable));
    expect(Currency).toEqual(
      expect.objectContaining({
        defaultPrecision: expect.any(Number),
        defaultRounding: expect.any(Number),
      }),
    );
  });
});
