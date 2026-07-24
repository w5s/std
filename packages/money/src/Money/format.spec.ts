import { BigDecimal } from '@w5s/bigdecimal';
import { describe, expect, it } from 'vitest';

import { Currency } from '../Currency.js';
import { format } from './format.js';
import { Money } from './Money.js';

describe(format, () => {
  const anyCurrency = Currency({ code: 'EUR', name: 'Euro', symbol: '€' });

  it('should return the formatted money value', () => {
    const result = format(Money({ amount: BigDecimal('1.10'), currency: anyCurrency }));
    expect(result).toBe('1.10EUR');
  });
});
