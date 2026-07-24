import { describe, expect, it } from 'vitest';

import type { Tag } from '../Tag.js';

import { Callable } from '../Callable.js';
import { Codec } from '../Codec.js';
import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeType } from '../Testing.js';
import { define } from './define.js';

describe(define, () => {
  type PositiveNumber = number & Tag<'Positive'>;
  const PositiveNumber = define<number, PositiveNumber>({
    hasInstance: (value) => typeof value === 'number' && value > 0,
    typeName: 'PositiveNumber',
  });

  describeType(PositiveNumber, () => ({
    instances: [1 as PositiveNumber, 1000 as PositiveNumber],
    notInstances: [0, -1, -1000],
    typeName: 'PositiveNumber',
  }));
  describe('#()', () => {
    it('returns identity', () => {
      expect(PositiveNumber(1)).toBe(1);
      expect(() => {
        // @ts-expect-error Throw a type error
        PositiveNumber('any_string');
      }).toThrow(new TypeError('any_string is not a valid PositiveNumber'));
    });
    it('should be callable', () => {
      expect(PositiveNumber[Callable.symbol](1)).toBe(1);
      expect(() => {
        // @ts-expect-error Throw a type error
        PositiveNumber[Callable.symbol]('any_string');
      }).toThrow(new TypeError('any_string is not a valid PositiveNumber'));
    });
  });
  describe('#wrap', () => {
    it('returns identity', () => {
      expect(PositiveNumber.wrap(1)).toBe(1);
      expect(() => {
        // @ts-expect-error Throw a type error
        PositiveNumber.wrap('any_string');
      }).toThrow(new TypeError('any_string is not a valid PositiveNumber'));
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
  describe('#__encode__', () => {
    it('returns identity', () => {
      expect(Codec.encode(PositiveNumber, 1 as PositiveNumber)).toEqual(1);
    });
  });
  describe('#__decode__', () => {
    it('returns a decoded value', () => {
      expect(Codec.decode(PositiveNumber, 1)).toEqual(Result.Ok(1));
      expect(Codec.decode(PositiveNumber, 'invalid_value')).toEqual(
        Result.Error(
          new CodecError({ input: 'invalid_value', message: 'Cannot decode "invalid_value" as PositiveNumber' }),
        ),
      );
      expect(Codec.decode(PositiveNumber, undefined)).toEqual(
        Result.Error(new CodecError({ input: undefined, message: 'Cannot decode undefined as PositiveNumber' })),
      );
    });
  });
  describe('#__schema__', () => {
    it('returns the schema', () => {
      expect(Codec.schema(PositiveNumber)).toEqual({});
    });
    it('is overridable', () => {
      const PositiveNumberWithSchema = define<number, PositiveNumber>({
        __schema__: () => ({
          type: 'number',
        }),
        hasInstance: (value) => typeof value === 'number' && value > 0,
        typeName: 'PositiveNumber',
      });
      expect(Codec.schema(PositiveNumberWithSchema)).toEqual({ type: 'number' });
    });
  });
});
