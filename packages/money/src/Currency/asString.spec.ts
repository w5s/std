import { describe, expect, it } from 'vitest';
import { asString } from './asString.js';
import { Currency } from './Currency.js';

describe(asString, () => {
  const anyCurrency = Currency({ code: 'EUR', symbol: '€', name: 'Euro' });

  it('returns the formatted money value', () => {
    const result = asString(anyCurrency);
    expect(result).toBe('EUR');
  });
});
