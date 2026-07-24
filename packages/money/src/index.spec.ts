import currencyData from 'currencies.json';
import { describe, expect, it } from 'vitest';

import { configuration } from './configuration.js';
import * as Module from './index.js';

describe('module public API', () => {
  it('should return correct values', () => {
    expect(Module).toEqual(
      expect.objectContaining({
        configuration,
        Currency: expect.any(Function),
        meta: expect.any(Object),
        Money: expect.any(Function),
      }),
    );
  });
  it.each(currencyData.currencies.map((_) => _.code))('%s() should be a function', (factoryName) => {
    const factory: (typeof Module)['EUR'] | undefined = Module[factoryName as 'EUR'];
    expect(factory).toEqual(expect.any(Function));
  });
});
