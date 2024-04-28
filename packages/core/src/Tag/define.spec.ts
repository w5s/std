import { describe, expect, it } from 'vitest';
import { describeType } from '../testing.js';
import { Codec, DecodeError } from '../Codec.js';
import { Result } from '../Result.js';
import type { Tag } from '../Tag.js';
import { define } from './define.js';

describe(define, () => {
  type PositiveNumber = number & Tag<'Positive'>;
  const PositiveNumber = define<number, PositiveNumber>({
    typeName: 'PositiveNumber',
    hasInstance: (value) => typeof value === 'number' && value > 0,
  });

  describeType({ describe, it, expect })(PositiveNumber, {
    typeName: 'PositiveNumber',
    instances: () => [1, 1000],
    notInstances: () => [0, -1, -1000],
  });
  describe('#()', () => {
    it('returns identity', () => {
      expect(PositiveNumber(1)).toBe(1);
      expect(() => {
        // @ts-expect-error Throw a type error
        PositiveNumber('');
      }).toThrow(new Error('Invalid PositiveNumber'));
    });
  });
  describe('#wrap', () => {
    it('returns identity', () => {
      expect(PositiveNumber.wrap(1)).toBe(1);
      expect(() => {
        // @ts-expect-error Throw a type error
        PositiveNumber.wrap('');
      }).toThrow(new Error('Invalid PositiveNumber'));
    });
  });
  describe('#unwrap', () => {
    it('returns identity', () => {
      const value = 1 as PositiveNumber;
      expect(PositiveNumber.unwrap(value)).toBe(1);
      // @ts-expect-error Throw a type error
      PositiveNumber.unwrap('');
    });
  });
  describe('#codecEncode', () => {
    it('returns identity', () => {
      expect(Codec.encode(PositiveNumber, 1 as PositiveNumber)).toEqual(1);
    });
  });
  describe('#codecDecode', () => {
    it('returns a decoded value', () => {
      expect(Codec.decode(PositiveNumber, 1)).toEqual(Result.Ok(1));
      expect(Codec.decode(PositiveNumber, 'invalid_value')).toEqual(
        Result.Error(DecodeError({ message: 'Cannot decode invalid_value as PositiveNumber', input: 'invalid' }))
      );
      expect(Codec.decode(PositiveNumber, undefined)).toEqual(
        Result.Error(DecodeError({ message: 'Cannot decode undefined as PositiveNumber', input: undefined }))
      );
    });
  });
  describe('#codecSchema', () => {
    it('returns the schema', () => {
      expect(Codec.schema(PositiveNumber)).toEqual({});
    });
    it('is overridable', () => {
      const PositiveNumberWithSchema = define<number, PositiveNumber>({
        typeName: 'PositiveNumber',
        hasInstance: (value) => typeof value === 'number' && value > 0,
        codecSchema: () => ({
          type: 'number',
        }),
      });
      expect(Codec.schema(PositiveNumberWithSchema)).toEqual({ type: 'number' });
    });
  });
});
