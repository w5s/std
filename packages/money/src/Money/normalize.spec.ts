import { describe, it, expect } from 'vitest';
import { BigDecimal } from '@w5s/bigdecimal';
import { normalize } from './normalize.js';
import { Money } from './Money.js';
import { CurrencyRegistry } from '../CurrencyRegistry.js';
import '../moneyFactory.all.js';

describe(normalize, () => {
  const USD = CurrencyRegistry.getByCode('USD')!;

  it('does not change amount if already normalized', () => {
    const original = Money({
      amount: BigDecimal('123'),
      currency: USD,
    });

    expect(normalize(original)).toBe(original);
  });

  it('updates amount to normalized value when different', () => {
    const original = Money({
      amount: BigDecimal('123.4500'),
      currency: USD,
    });

    expect(normalize(original)).toEqual(
      Money({
        amount: BigDecimal('123.45'),
        currency: USD,
      }),
    );
  });
});
