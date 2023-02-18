import { describe, expect, it } from '@jest/globals';
import { application } from '@w5s/app';
import { Currency } from './currency.js';
import { CurrencyRegistry } from './currencyRegistry.js';

describe('CurrencyRegistry', () => {
  const anyCurrency = Currency({ name: 'TEST', code: 'TEST', symbol: 'T' });

  describe('.getByCode() / .add()', () => {
    it('should store data', () => {
      const app = application({ id: 'test' });
      const registry = CurrencyRegistry(app);

      expect(registry.getByCode(anyCurrency.code)).toBe(undefined);

      registry.add(anyCurrency);

      expect(registry.getByCode(anyCurrency.code)).toBe(anyCurrency);
    });
  });

  describe('.add', () => {
    it('should be a function', () => {
      expect(typeof CurrencyRegistry.add).toBe('function');
    });
  });
  describe('.getByCode', () => {
    it('should be a function', () => {
      expect(typeof CurrencyRegistry.getByCode).toBe('function');
    });
  });
});
