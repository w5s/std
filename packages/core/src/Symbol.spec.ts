import { describe, expect, it } from 'vitest';
import { Symbol } from './Symbol.js';

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
  describe('.call', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.call).toBe('string');
    });
  });
  describe('.inspect', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.inspect).toBe('string');
    });
  });
  describe('.encode', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.encode).toBe('string');
    });
  });
  describe('.decode', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.decode).toBe('string');
    });
  });
  describe('.schema', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.schema).toBe('string');
    });
  });
  describe('.enumKeys', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.enumKeys).toBe('string');
    });
  });
  describe('.run', () => {
    it('should be a symbol', () => {
      expect(typeof Symbol.run).toBe('string');
    });
  });
});
