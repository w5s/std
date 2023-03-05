import { describe, it, expect, jest } from '@jest/globals';
import { Option } from './option.js';
import { Record } from './record.js';

describe('Dict', () => {
  const anySymbolKey = Symbol('anySymbolKey');

  function toArray<V>(iterator: IterableIterator<V>): Array<V> {
    return Array.from(iterator);
  }
  describe('.from', () => {
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

  describe('.keys', () => {
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
    it('should handle symbol keys', () => {
      expect(
        toArray(
          Record.keys({
            [anySymbolKey]: 'anyValue',
            anyOtherKey: 'anyOtherValue',
          })
        )
      ).toEqual(['anyOtherKey', anySymbolKey]);
    });
  });
  describe('.values', () => {
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
  describe('.entries', () => {
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
  describe('.has', () => {
    it('should return false if key does not exist', () => {
      const record: Record<string, string> = { anyKey: 'anyValue' };
      expect(Record.has(record, 'anyOtherKey')).toBe(false);
    });
    it('should true if key exist', () => {
      const record = { anyKey: 'anyValue' };
      expect(Record.has(record, 'anyKey')).toBe(true);
    });
  });
  describe('.get', () => {
    it('should return undefined if key does not exist', () => {
      const record: Record<string, string> = { anyKey: 'anyValue' };
      expect(Record.get(record, 'anyOtherKey')).toBe(Option.None);
    });
    it('should return value if key exist', () => {
      const record = { anyKey: 'anyValue' };
      expect(Record.get(record, 'anyKey')).toBe('anyValue');
    });
  });
  describe('.set', () => {
    it('should set value for key', () => {
      const record: Record<string, string> = { anyKey: 'anyValue' };
      expect(Record.set(record, 'anyOtherKey', 'anyOtherValue')).toEqual({
        anyKey: 'anyValue',
        anyOtherKey: 'anyOtherValue',
      });
    });
    it('should return unchanged dict if value is the same', () => {
      const record = { anyKey: 'anyValue' };
      expect(Record.set(record, 'anyKey', 'anyValue')).toStrictEqual(record);
    });
  });
  describe('.delete', () => {
    it('should return identity for empty dictionary', () => {
      const record: Record<string, string> = {};
      expect(Record.delete(record, 'anyKey')).toBe(record);
    });
    it('should return identity if key is not found', () => {
      const record: Record<string, string> = { anyKey: 'anyValue' };
      expect(Record.delete(record, 'anyOtherKey')).toBe(record);
    });
    it('should return a new dictionary without key', () => {
      const record = { anyKey: 'anyValue' };
      expect(Record.delete(record, 'anyKey')).toEqual({});
    });
  });

  describe('.forEach', () => {
    it('should return an array of keys', () => {
      const fn = jest.fn();
      const record = { anyKey: 'anyValue', anyOtherKey: 'anyOtherValue' };
      Record.forEach(record, fn);
      expect(fn.mock.calls).toEqual([
        ['anyValue', 'anyKey', record],
        ['anyOtherValue', 'anyOtherKey', record],
      ]);
    });
  });
  describe('.size', () => {
    it('should return 0 for empty', () => {
      expect(Record.size(Record.empty())).toEqual(0);
    });
    it('should return an array of keys', () => {
      expect(Record.size({ anyKey: 'anyValue', anyOtherKey: 'anyOtherValue' })).toEqual(2);
    });
  });
});
