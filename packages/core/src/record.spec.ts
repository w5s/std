import { describe, it, expect, jest } from '@jest/globals';
import { Record } from './record.js';

describe('Dict', () => {
  function toArray<V>(iterator: IterableIterator<V>): Array<V> {
    return Array.from(iterator);
  }
  describe(Record.from, () => {
    it('should return a dictionary from entries', () => {
      expect(
        Record([
          ['anyKey', 'anyValue'],
          ['anyOtherKey', 'anyOtherValue'],
        ])
      ).toEqual({
        anyKey: 'anyValue',
        anyOtherKey: 'anyOtherValue',
      });
    });
  });

  describe(Record.keys, () => {
    it('should return an array of keys', () => {
      expect(
        toArray(
          Record.keys({
            anyKey: 'anyValue',
            anyOtherKey: 'anyOtherValue',
          })
        )
      ).toEqual(['anyKey', 'anyOtherKey']);
    });
  });
  describe(Record.values, () => {
    it('should return an array of keys', () => {
      expect(
        toArray(
          Record.values({
            anyKey: 'anyValue',
            anyOtherKey: 'anyOtherValue',
          })
        )
      ).toEqual(['anyValue', 'anyOtherValue']);
    });
  });
  describe(Record.entries, () => {
    it('should return an array of [key, value]', () => {
      expect(
        toArray(
          Record.entries({
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
  describe(Record.has, () => {
    it('should return false if key does not exist', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Record.has(dict, 'anyOtherKey')).toBe(false);
    });
    it('should true if key exist', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Record.has(dict, 'anyKey')).toBe(true);
    });
  });
  describe(Record.get, () => {
    it('should return undefined if key does not exist', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Record.get(dict, 'anyOtherKey')).toBe(undefined);
    });
    it('should return value if key exist', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Record.get(dict, 'anyKey')).toBe('anyValue');
    });
  });
  describe(Record.set, () => {
    it('should set value for key', () => {
      expect(Record.set({ anyKey: 'anyValue' }, 'anyOtherKey', 'anyOtherValue')).toEqual({
        anyKey: 'anyValue',
        anyOtherKey: 'anyOtherValue',
      });
    });
    it('should return unchanged dict if value is the same', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Record.set(dict, 'anyKey', 'anyValue')).toStrictEqual(dict);
    });
  });
  describe(Record.delete, () => {
    it('should return identity for empty dictionary', () => {
      const dict = {};
      expect(Record.delete(dict, 'anyKey')).toBe(dict);
    });
    it('should return identity if key is not found', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Record.delete(dict, 'anyOtherKey')).toBe(dict);
    });
    it('should return a new dictionary without key', () => {
      const dict = { anyKey: 'anyValue' };
      expect(Record.delete(dict, 'anyKey')).toEqual({});
    });
  });

  describe(Record.forEach, () => {
    it('should return an array of keys', () => {
      const fn = jest.fn();
      const dict = { anyKey: 'anyValue', anyOtherKey: 'anyOtherValue' };
      Record.forEach(dict, fn);
      expect(fn.mock.calls).toEqual([
        ['anyValue', 'anyKey', dict],
        ['anyOtherValue', 'anyOtherKey', dict],
      ]);
    });
  });
  describe(Record.size, () => {
    it('should return 0 for empty', () => {
      expect(Record.size(Record.empty())).toEqual(0);
    });
    it('should return an array of keys', () => {
      expect(Record.size({ anyKey: 'anyValue', anyOtherKey: 'anyOtherValue' })).toEqual(2);
    });
  });
});
