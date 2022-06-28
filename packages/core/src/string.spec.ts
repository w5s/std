import { describe, test, expect } from '@jest/globals';
import { Option } from './option.js';
import { String } from './string.js';

describe('String', () => {
  describe(String.at, () => {
    test('should return Option.None when index is not defined', () => {
      expect(String.at('a', 1)).toBe(Option.None);
    });
    test('should return element at index', () => {
      expect(String.at('abc', 0)).toBe('a');
    });
    test('should return last when negative', () => {
      expect(String.at('abc', -1)).toBe('c');
    });
  });
  describe(String.concat, () => {
    test('should join all parts', () => {
      expect(String.concat(['a', 'b', 'c'])).toEqual('abc');
    });
  });
  describe(String.join, () => {
    test('should join all parts', () => {
      expect(String.join('|', ['a', 'b', 'c'])).toEqual('a|b|c');
    });
  });
  describe(String.hasInstance, () => {
    test('should return true for string', () => {
      expect(String.hasInstance('abc')).toEqual(true);
    });
    test('should return false for any other value', () => {
      expect(String.hasInstance(null)).toBe(false);
      expect(String.hasInstance({ length: 0 })).toBe(false);
    });
  });
  describe(String.isEmpty, () => {
    test('should return true when array is empty', () => {
      expect(String.isEmpty('')).toEqual(true);
    });
    test('should same instance', () => {
      expect(String.isEmpty('abc')).toBe(false);
    });
  });
  describe(String.size, () => {
    test('should return 0 for empty string', () => {
      expect(String.size('')).toBe(0);
    });
    test('should return string length', () => {
      expect(String.size('abc')).toBe(3);
    });
  });
});
