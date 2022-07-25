import { describe, test, expect } from '@jest/globals';
import currencyData from 'currencies.json';
import * as MoneyFactory from './moneyFactory.all.js';

describe.each(['USD', 'EUR'] as const)('%s()', (factoryName) => {
  const factory = MoneyFactory[factoryName];
  test('should be a valid money factory', () => {
    const money = factory(1);
    expect(money.currency.code).toBe(factoryName);
    expect(money.currency).toMatchSnapshot('currency');
  });
});
describe.each(currencyData.currencies.map((_) => _.code))('%s()', (factoryName) => {
  const factory: typeof MoneyFactory['EUR'] | undefined = MoneyFactory[factoryName as 'EUR'];
  test('should be a function', () => {
    expect(factory).toEqual(expect.any(Function));
  });
});
