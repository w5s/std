import { describe, expect, it } from 'vitest';
import { ApplicationTest } from '@w5s/application/dist/testing.js';
import { Currency } from './Currency.js';
import { CurrencyRegistry } from './CurrencyRegistry.js';

describe('CurrencyRegistry', () => {
  const anyCurrency = Currency({ name: 'TEST', code: 'TEST', symbol: 'T' });

  describe('.getByCode() / .add()', () => {
    it('should store data', () => {
      const app = ApplicationTest();
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
