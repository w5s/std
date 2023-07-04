import { describe, it, expect, beforeEach } from 'vitest';
import { Int } from '@w5s/core';
import { ApplicationTest } from '@w5s/application/dist/testing.js';
import { Currency } from './currency.js';
import { CurrencyRegistry } from './currencyRegistry.js';
import { Money } from './money.js';
import { moneyFactory } from './moneyFactory.js';

describe('moneyFactory', () => {
  let registry: CurrencyRegistry;
  beforeEach(() => {
    const app = ApplicationTest();
    registry = CurrencyRegistry(app);
  });

  it('should register a new currency', () => {
    registry.add(
      Currency({
        name: 'test',
        code: 'TEST',
        symbol: '#',
      })
    );

    moneyFactory('TEST', {
      registry,
    });
    const currency = registry.getByCode('TEST');
    expect(currency).toEqual(
      Currency({
        code: 'TEST',
        precision: Int(2),
        name: 'test',
        namePlural: 'test',
        rounding: Int(0),
        symbol: '#',
        symbolNative: '#',
      })
    );
  });
  it('should return a new factory', () => {
    registry.add(
      Currency({
        name: 'test',
        code: 'TEST',
        symbol: '#',
      })
    );

    const factory = moneyFactory('TEST', {
      registry,
    });
    const currency = Currency({
      code: 'TEST',
      precision: Int(2),
      name: 'test',
      namePlural: 'test',
      rounding: Int(0),
      symbol: '#',
      symbolNative: '#',
    });
    expect(factory(1)).toEqual(Money({ currency, amount: 1 }));
  });
});
