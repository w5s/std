import { describe, expect, it } from '@jest/globals';
import { Application } from '@w5s/app';
import { Ref } from '@w5s/core';
import { Currency } from './currency.js';
import { CurrencyRegistry } from './currencyRegistry.js';

describe('CurrencyRegistry', () => {
  const target = Ref({});
  const anyCurrency = Currency({ name: 'TEST', code: 'TEST', symbol: 'T' });

  describe('.getByCode() / .add()', () => {
    it('should store data', () => {
      const app = Application({ id: 'test', target });
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
