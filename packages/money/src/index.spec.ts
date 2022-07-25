import { describe, expect, test } from '@jest/globals';
import currencyData from 'currencies.json';
import * as Module from './index.js';

describe('module public API', () => {
  test('should return correct values', () => {
    expect(Module).toEqual(
      expect.objectContaining({
        Currency: expect.any(Function),
        Money: expect.any(Function),
        moneyFactory: expect.any(Function),
      })
    );
  });
  test.each(currencyData.currencies.map((_) => _.code))('%s() should be a function', (factoryName) => {
    const factory: typeof Module['EUR'] | undefined = Module[factoryName as 'EUR'];
    expect(factory).toEqual(expect.any(Function));
  });
});
