import { describe, expect, it } from 'vitest';
import { BigDecimal } from '@w5s/bigdecimal';
import { format } from './format.js';
import { Money } from './Money.js';
import { Currency } from '../Currency.js';

describe(format, () => {
  const anyCurrency = Currency({ code: 'EUR', symbol: '€', name: 'Euro' });

  it('should return the formatted money value', () => {
    const result = format(Money({ amount: BigDecimal('1.10'), currency: anyCurrency }));
    expect(result).toBe('1.10EUR');
  });
});
