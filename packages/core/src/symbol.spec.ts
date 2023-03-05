import { describe, expect, it } from 'vitest';
import { Symbol } from './symbol.js';

const GlobalSymbol = globalThis.Symbol;
describe('Symbol', () => {
  describe.each([
    'iterator',
    'asyncIterator',
    'hasInstance',
    'isConcatSpreadable',
    'match',
    'replace',
    'search',
    'split',
    'species',
    'toPrimitive',
    'toStringTag',
    'unscopables',
  ] as const)('.%s', (alias) => {
    it(`should be a alias to Symbol.${alias}`, () => {
      expect(typeof Symbol[alias]).toBe('symbol');
      expect(Symbol[alias]).toBe(GlobalSymbol[alias]);
    });
  });
  describe('.dispose', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.dispose).toBe('symbol');
    });
  });
  describe('.asyncDispose', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.asyncDispose).toBe('symbol');
    });
  });
  describe('.globalStorage', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.globalStorage).toBe('symbol');
    });
  });
});
