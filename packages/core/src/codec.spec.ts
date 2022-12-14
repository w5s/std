import { describe, it, expect } from '@jest/globals';
import { Result } from './result.js';
import { Codec, boolean, number, string, DecodeError, lazy, option, dateISO, array, object } from './codec.js';

// Example of codec
const underscoreString = Codec<string>({
  encode: (_) => `_${_}`,
  decode: (input) =>
    typeof input === 'string' && input[0] === '_'
      ? Result.Ok(input.slice(1))
      : Result.Error(
          DecodeError({
            message: 'Invalid underscore string',
            input,
          })
        ),
  schema: () => ({ type: 'string', format: 'custom_underscore' }),
});
describe(Codec, () => {
  describe(Codec.encode, () => {
    it('should call codecEncode', () => {
      const codec = {
        codecEncode: (_: string) => `test_${_}`,
      };
      expect(Codec.encode(codec, 'value')).toEqual('test_value');
    });
  });
  describe(Codec.decode, () => {
    it('should call codecEncode', () => {
      const codec = {
        codecDecode: (_: unknown) => Result.Ok(`test_${_}`),
      };
      expect(Codec.decode(codec, 'value')).toEqual(Result.Ok('test_value'));
    });
  });
});

describe('boolean', () => {
  const subject = boolean;
  describe('.codecSchema', () => {
    it('should return correct schema', () => {
      expect(Codec.schema(subject)).toEqual({ type: 'boolean' });
    });
  });
  describe('.codecEncode', () => {
    it.each([
      [true, true],
      [false, false],
    ])('should decode values', (input, expected) => {
      expect(Codec.encode(subject, input)).toEqual(expected);
    });
  });
  describe('.codecDecode', () => {
    it.each([
      [undefined, Result.Error(DecodeError({ message: 'undefined is not a valid boolean', input: undefined }))],
      [0, Result.Error(DecodeError({ message: '0 is not a valid boolean', input: 0 }))],
      [true, Result.Ok(true)],
      [false, Result.Ok(false)],
    ])('should decode values', (input, expected) => {
      expect(Codec.decode(subject, input)).toEqual(expected);
    });
  });
});
describe('number', () => {
  const subject = number;
  describe('.codecSchema', () => {
    it('should return correct schema', () => {
      expect(Codec.schema(subject)).toEqual({ type: 'number' });
    });
  });
  describe('.codecEncode', () => {
    it.each([
      [0, 0],
      [1, 1],
      [Number.NaN, Number.NaN],
    ])('should decode values', (input, expected) => {
      expect(Codec.encode(subject, input)).toEqual(expected);
    });
  });
  describe('.codecDecode', () => {
    it.each([
      [undefined, Result.Error(DecodeError({ message: 'undefined is not a valid number', input: undefined }))],
      [0, Result.Ok(0)],
      [true, Result.Error(DecodeError({ message: 'true is not a valid number', input: true }))],
    ])('should decode values', (input, expected) => {
      expect(Codec.decode(subject, input)).toEqual(expected);
    });
  });
});
describe('string', () => {
  const subject = string;
  describe('.codecSchema', () => {
    it('should return correct schema', () => {
      expect(Codec.schema(subject)).toEqual({ type: 'string' });
    });
  });
  describe('.codecEncode', () => {
    it.each([
      ['', ''],
      ['abc', 'abc'],
    ])('should decode values', (input, expected) => {
      expect(Codec.encode(subject, input)).toEqual(expected);
    });
  });
  describe('.codecDecode', () => {
    it.each([
      [undefined, Result.Error(DecodeError({ message: 'undefined is not a valid string', input: undefined }))],
      [0, Result.Error(DecodeError({ message: '0 is not a valid string', input: 0 }))],
      [true, Result.Error(DecodeError({ message: 'true is not a valid string', input: true }))],
      ['true', Result.Ok('true')],
    ])('should decode values', (input, expected) => {
      expect(Codec.decode(subject, input)).toEqual(expected);
    });
  });
});
describe(lazy, () => {
  const subject = lazy;
  const getCodec = () =>
    Codec<string>({
      encode: (_) => `__${_}`,
      decode: (_) => Result.Ok(String(_).slice(2)),
      schema: () => ({ type: 'string', format: 'test' }),
    });

  describe('.codecSchema', () => {
    it('should forward schema', () => {
      const codec = subject(getCodec);
      expect(Codec.schema(codec)).toEqual({ type: 'string', format: 'test' });
    });
  });
  describe('.codecEncode', () => {
    it('should forward encode', () => {
      const codec = subject(getCodec);
      expect(Codec.encode(codec, 'a')).toEqual('__a');
    });
  });
  describe('.codecDecode', () => {
    it('should forward decode', () => {
      const codec = subject(getCodec);
      expect(Codec.decode(codec, '__a')).toEqual(Result.Ok('a'));
    });
  });
});
describe(option, () => {
  const subject = option;

  describe('.codecSchema', () => {
    it('should return correct schema', () => {
      const optionalString = subject(underscoreString);
      expect(Codec.schema(optionalString)).toEqual({ type: 'string', format: 'custom_underscore' });
    });
  });
  describe('.codecEncode', () => {
    it.each([
      [undefined, null],
      ['', '_'],
      ['abc', '_abc'],
    ])('should encode values', (input, expected) => {
      const optionalString = subject(underscoreString);
      expect(Codec.encode(optionalString, input)).toEqual(expected);
    });
  });
  describe('.codecDecode', () => {
    it.each([
      [undefined, Result.Ok(undefined)],
      [null, Result.Ok(undefined)],
      ['_', Result.Ok('')],
      ['_abc', Result.Ok('abc')],
    ])('should encode values', (input, expected) => {
      const optionalString = subject(underscoreString);
      expect(Codec.decode(optionalString, input)).toEqual(expected);
    });
  });
});
describe(array, () => {
  const subject = array;
  describe('.codecSchema', () => {
    it('should return correct schema', () => {
      const codec = subject(underscoreString);
      expect(Codec.schema(codec)).toEqual({ type: 'array', item: { type: 'string', format: 'custom_underscore' } });
    });
  });
  describe('.codecEncode', () => {
    it.each([
      [
        ['a', 'b', 'c'],
        ['_a', '_b', '_c'],
      ],
    ])('should encode values', (input, expected) => {
      const arrayString = subject(underscoreString);
      expect(Codec.encode(arrayString, input)).toEqual(expected);
    });
  });
  describe('.codecDecode', () => {
    it.each([
      [['_a', '_b', '_c'], Result.Ok(['a', 'b', 'c'])],
      [
        ['a', '_b', '_c'],
        Result.Error(
          DecodeError({
            message: 'Invalid underscore string',
            input: 'a',
          })
        ),
      ],
    ])('should encode values', (input, expected) => {
      const arrayString = subject(underscoreString);
      expect(Codec.decode(arrayString, input)).toEqual(expected);
    });
  });
});
describe(object, () => {
  const subject = object;
  describe('.codecSchema', () => {
    it('should return correct schema', () => {
      const codec = subject({ foo: underscoreString });
      expect(Codec.schema(codec)).toEqual({
        type: 'object',
        required: [],
        properties: {
          foo: {
            type: 'string',
            format: 'custom_underscore',
          },
        },
      });
    });
  });
  describe('.codecEncode', () => {
    it.each([
      [
        { foo: 'a', bar: 'b' },
        { foo: '_a', bar: '_b' },
      ],
    ])('should encode values', (input, expected) => {
      const codec = subject({
        foo: underscoreString,
        bar: underscoreString,
      });
      expect(Codec.encode(codec, input)).toEqual(expected);
    });
  });
  describe('.codecDecode', () => {
    it.each([
      [{ foo: '_a', bar: '_b' }, Result.Ok({ foo: 'a', bar: 'b' })],
      [
        { foo: '' },
        Result.Error(
          DecodeError({
            message: 'Invalid underscore string',
            input: '',
          })
        ),
      ],
    ])('should encode values', (input, expected) => {
      const arrayString = subject({
        foo: underscoreString,
        bar: underscoreString,
      });
      expect(Codec.decode(arrayString, input)).toEqual(expected);
    });
  });
});
describe('dateISO', () => {
  const subject = dateISO;
  describe('.codecSchema', () => {
    it('should return correct schema', () => {
      expect(Codec.schema(subject)).toEqual({ type: 'string', format: 'date-time' });
    });
  });
  describe('.codecEncode', () => {
    it.each([
      [new Date(0), '1970-01-01T00:00:00.000Z'],
      [new Date('2022-08-01T20:14:09.721Z'), '2022-08-01T20:14:09.721Z'],
    ])('should encode values', (input, expected) => {
      expect(Codec.encode(subject, input)).toEqual(expected);
    });
  });
  describe('.codecDecode', () => {
    it.each([
      ['1970-01-01T00:00:00.000Z', Result.Ok(new Date(0))],
      ['2022-08-01T20:14:09.721Z', Result.Ok(new Date('2022-08-01T20:14:09.721Z'))],
      [
        undefined,
        Result.Error(
          DecodeError({
            message: 'undefined is not a valid string',
            input: undefined,
          })
        ),
      ],
      [
        'foo',
        Result.Error(
          DecodeError({
            message: 'foo is not a valid Date',
            input: 'foo',
          })
        ),
      ],
    ])('should encode values', (input, expected) => {
      expect(Codec.decode(subject, input)).toEqual(expected);
    });
  });
});
