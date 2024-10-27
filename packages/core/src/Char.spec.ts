import { describe, it, expect } from 'vitest';
import { Char } from './Char.js';
import { Char as CharType } from './Type/Char.js';
import { CharComparable } from './Char/CharComparable.js';
import { CharBounded } from './Char/CharBounded.js';
import { fromCodePoint } from './Char/fromCodePoint.js';
import { CharIndexable } from './Char/CharIndexable.js';

describe(Char, () => {
  it('is an alias to functions', () => {
    expect(Char).toEqual(expect.objectContaining({ ...CharType }));
    expect(Char).toEqual(expect.objectContaining(CharComparable));
    expect(Char).toEqual(expect.objectContaining(CharBounded));
    expect(Char).toEqual(expect.objectContaining(CharIndexable));
    expect(Char).toEqual(
      expect.objectContaining({
        fromCodePoint,
      }),
    );
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
