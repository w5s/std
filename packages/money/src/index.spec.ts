import { describe, expect, it } from 'vitest';
import currencyData from 'currencies.json';
import * as Module from './index.js';
import { configuration } from './configuration.js';

describe('module public API', () => {
  it('should return correct values', () => {
    expect(Module).toEqual(
      expect.objectContaining({
        meta: expect.any(Object),
        configuration,
        Currency: expect.any(Function),
        Money: expect.any(Function),
      }),
    );
  });
  it.each(currencyData.currencies.map((_) => _.code))('%s() should be a function', (factoryName) => {
    const factory: (typeof Module)['EUR'] | undefined = Module[factoryName as 'EUR'];
    expect(factory).toEqual(expect.any(Function));
  });
});
