import { describe, it, expect } from 'vitest';
import { Currency } from './Currency.js';

describe('Currency', () => {
  it('should create a currency', () => {
    expect(Currency).toMatchInlineSnapshot(`[Function]`);
    expect(Currency).toEqual(
      expect.objectContaining({
        defaultPrecision: expect.any(Number),
        defaultRounding: expect.any(Number),
        asString: expect.any(Function),
      }),
    );
  });
});
