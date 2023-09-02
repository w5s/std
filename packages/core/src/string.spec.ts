import { describe, it, expect } from 'vitest';
import { Option } from './option.js';
import { String } from './string.js';
import { describeComparable } from './testing.js';

describe('String', () => {
  describe('.of', () => {
    it('should join all parts', () => {
      expect(String.of('a', 'b', 'c')).toEqual('abc');
    });
  });
  describe('.fromCodePoint', () => {
    it('should return true only when present', () => {
      expect(String.fromCodePoint(65, 65)).toEqual('AA');
      expect(String.fromCodePoint(9731, 9731)).toEqual('☃☃');
    });
  });
  describe('.at', () => {
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
  describe('.concat', () => {
    it('should join all parts', () => {
      expect(String.concat(['a', 'b', 'c'])).toEqual('abc');
    });
  });
  describe('.join', () => {
    it('should join all parts', () => {
      expect(String.join('|', ['a', 'b', 'c'])).toEqual('a|b|c');
    });
  });
  describe('.split', () => {
    it('should split all parts', () => {
      expect(String.split('a|b|c', '|')).toEqual(['a', 'b', 'c']);
      expect(String.split('a|b|c', '|', 2)).toEqual(['a', 'b']);
    });
  });
  describe('.hasInstance', () => {
    it('should return true for string', () => {
      expect(String.hasInstance('abc')).toEqual(true);
    });
    it('should return false for any other value', () => {
      expect(String.hasInstance(null)).toBe(false);
      expect(String.hasInstance({ length: 0 })).toBe(false);
    });
  });
  describe('.isEmpty', () => {
    it('should return true when array is empty', () => {
      expect(String.isEmpty('')).toEqual(true);
    });
    it('should same instance', () => {
      expect(String.isEmpty('abc')).toBe(false);
    });
  });
  describe('.size', () => {
    it('should return 0 for empty string', () => {
      expect(String.size('')).toBe(0);
    });
    it('should return string length', () => {
      expect(String.size('abc')).toBe(3);
    });
  });
  describe('.indexOf', () => {
    it('should return index of element', () => {
      const string = 'aaa';
      expect(String.indexOf(string, 'a')).toEqual(0);
    });
    it('should return index of element with startIndex', () => {
      const string = 'aaa';
      expect(String.indexOf(string, 'a', 1)).toEqual(1);
    });
    it('should return Option.None when not found', () => {
      const string = 'abc';
      expect(String.indexOf(string, 'non_existent', 1)).toEqual(Option.None);
    });
  });
  describe('.lastIndexOf', () => {
    it('should return index of element', () => {
      const string = 'aaa';
      expect(String.lastIndexOf(string, 'a')).toEqual(2);
    });
    it('should return index of element with startIndex', () => {
      const string = 'aaa';
      expect(String.lastIndexOf(string, 'a', 1)).toEqual(1);
    });
    it('should return Option.None when not found', () => {
      const string = 'abc';
      expect(String.lastIndexOf(string, 'non_existent', 1)).toEqual(Option.None);
    });
  });
  describe('.includes', () => {
    it('should return true only when present', () => {
      const string = 'abc';

      expect(String.includes(string, '')).toEqual(true);
      expect(String.includes(string, 'ab')).toEqual(true);
      expect(String.includes(string, 'abc')).toEqual(true);
      expect(String.includes(string, 'abcd')).toEqual(false);
      expect(String.includes(string, 'absent')).toEqual(false);
    });
  });
  describeComparable({ describe, it, expect })(String, {
    ordered: () => ['a', 'b', 'c'],
    equivalent: () => [
      ['', ''],
      ['ab', 'ab'],
    ],
  });
});
