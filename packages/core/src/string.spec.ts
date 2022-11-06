import { describe, it, expect } from '@jest/globals';
import { Option } from './option.js';
import { String } from './string.js';

describe('String', () => {
  describe(String.at, () => {
    it('should return Option.None when index is not defined', () => {
      expect(String.at('a', 1)).toBe(Option.None);
    });
    it('should return element at index', () => {
      expect(String.at('abc', 0)).toBe('a');
    });
    it('should return last when negative', () => {
      expect(String.at('abc', -1)).toBe('c');
    });
  });
  describe(String.concat, () => {
    it('should join all parts', () => {
      expect(String.concat(['a', 'b', 'c'])).toEqual('abc');
    });
  });
  describe(String.join, () => {
    it('should join all parts', () => {
      expect(String.join('|', ['a', 'b', 'c'])).toEqual('a|b|c');
    });
  });
  describe(String.hasInstance, () => {
    it('should return true for string', () => {
      expect(String.hasInstance('abc')).toEqual(true);
    });
    it('should return false for any other value', () => {
      expect(String.hasInstance(null)).toBe(false);
      expect(String.hasInstance({ length: 0 })).toBe(false);
    });
  });
  describe(String.isEmpty, () => {
    it('should return true when array is empty', () => {
      expect(String.isEmpty('')).toEqual(true);
    });
    it('should same instance', () => {
      expect(String.isEmpty('abc')).toBe(false);
    });
  });
  describe(String.size, () => {
    it('should return 0 for empty string', () => {
      expect(String.size('')).toBe(0);
    });
    it('should return string length', () => {
      expect(String.size('abc')).toBe(3);
    });
  });
});
