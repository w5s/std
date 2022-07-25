import { describe, test, expect, beforeEach } from '@jest/globals';
import { Int } from '@w5s/core';
import { Currency } from './currency.js';
import { CurrencyRegistry } from './currencyRegistry.js';
import { Money } from './money.js';
import * as MoneyFactory from './moneyFactory.js';

describe(MoneyFactory.moneyFactory, () => {
  let registry: CurrencyRegistry;
  beforeEach(() => {
    registry = new CurrencyRegistry();
  });

  test('should register a new currency', () => {
    MoneyFactory.moneyFactory(
      {
        name: 'test',
        code: 'TEST',
        symbol: '#',
      },
      {
        registry,
      }
    );
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
  test('should return a new factory', () => {
    const factory = MoneyFactory.moneyFactory(
      {
        name: 'test',
        code: 'TEST',
        symbol: '#',
      },
      {
        registry,
      }
    );
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

describe.each(['USD', 'EUR'] as const)('%s()', (factoryName) => {
  const factory = MoneyFactory[factoryName];
  test('should be a valid money factory', () => {
    const money = factory(1);
    expect(money.currency.code).toBe(factoryName);
    expect(money.currency).toMatchSnapshot('currency');
  });
});
