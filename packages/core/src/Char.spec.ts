import { describe, it, expect } from 'vitest';
import { Char } from './Char.js';
import { Char as CharType } from './Type/Char.js';

describe(Char, () => {
  it('is an alias to functions', () => {
    expect(Char).toEqual(expect.objectContaining({ ...CharType }));
  });
  describe('()', () => {
    it('returns or throw when wrong value', () => {
      expect(Char('a')).toBe('a');
      expect(() => {
        Char('ab');
      }).toThrow(new Error('ab is not a valid Char'));
    });
  });

  describe('type', () => {
    it('should avoid type mismatch', () => {
      const square = (value: Char) => Char(value);
      // @ts-expect-error number is not a Int32
      square('a');
      square(Char('a'));
    });
  });
});
