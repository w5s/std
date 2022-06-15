import { describe, test, expect, jest } from '@jest/globals';
import { Dict } from './dict.js';

describe('Dict', () => {
  function toArray<V>(it: IterableIterator<V>): Array<V> {
    return Array.from(it);
  }
  describe(Dict.from, () => {
    test('should return a dictionary from entries', () => {
      expect(
        Dict([
          ['anyKey', 'anyValue'],
          ['anyOtherKey', 'anyOtherValue'],
        ])
      ).toEqual({
        anyKey: 'anyValue',
        anyOtherKey: 'anyOtherValue',
      });
    });
  });

  describe(Dict.keys, () => {
    test('should return an array of keys', () => {
      expect(
        toArray(
          Dict.keys({
            anyKey: 'anyValue',
            anyOtherKey: 'anyOtherValue',
          })
        )
      ).toEqual(['anyKey', 'anyOtherKey']);
    });
  });
  describe(Dict.values, () => {
    test('should return an array of keys', () => {
      expect(
        toArray(
          Dict.values({
            anyKey: 'anyValue',
            anyOtherKey: 'anyOtherValue',
          })
        )
      ).toEqual(['anyValue', 'anyOtherValue']);
    });
  });
  describe(Dict.entries, () => {
    test('should return an array of [key, value]', () => {
      expect(
        toArray(
          Dict.entries({
            anyKey: 'anyValue',
            anyOtherKey: 'anyOtherValue',
          })
        )
      ).toEqual([
        ['anyKey', 'anyValue'],
        ['anyOtherKey', 'anyOtherValue'],
      ]);
    });
  });
  describe(Dict.has, () => {
    test('should return false if key does not exist', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Dict.has(dict, 'anyOtherKey')).toBe(false);
    });
    test('should true if key exist', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Dict.has(dict, 'anyKey')).toBe(true);
    });
  });
  describe(Dict.get, () => {
    test('should return undefined if key does not exist', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Dict.get(dict, 'anyOtherKey')).toBe(undefined);
    });
    test('should return value if key exist', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Dict.get(dict, 'anyKey')).toBe('anyValue');
    });
  });
  describe(Dict.set, () => {
    test('should set value for key', () => {
      expect(Dict.set({ anyKey: 'anyValue' }, 'anyOtherKey', 'anyOtherValue')).toEqual({
        anyKey: 'anyValue',
        anyOtherKey: 'anyOtherValue',
      });
    });
    test('should return unchanged dict if value is the same', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Dict.set(dict, 'anyKey', 'anyValue')).toStrictEqual(dict);
    });
  });
  describe(Dict.delete, () => {
    test('should return identity for empty dictionary', () => {
      const dict = {};
      expect(Dict.delete(dict, 'anyKey')).toBe(dict);
    });
    test('should return identity if key is not found', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Dict.delete(dict, 'anyOtherKey')).toBe(dict);
    });
    test('should return a new dictionary without key', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Dict.delete(dict, 'anyKey')).toEqual({});
    });
  });

  describe(Dict.forEach, () => {
    test('should return an array of keys', () => {
      const fn = jest.fn();
      const dict = { anyKey: 'anyValue', anyOtherKey: 'anyOtherValue' };
      Dict.forEach(dict, fn);
      expect(fn.mock.calls).toEqual([
        ['anyValue', 'anyKey', dict],
        ['anyOtherValue', 'anyOtherKey', dict],
      ]);
    });
  });
  describe(Dict.size, () => {
    test('should return 0 for empty', () => {
      expect(Dict.size(Dict.empty())).toEqual(0);
    });
    test('should return an array of keys', () => {
      expect(Dict.size({ anyKey: 'anyValue', anyOtherKey: 'anyOtherValue' })).toEqual(2);
    });
  });
});
