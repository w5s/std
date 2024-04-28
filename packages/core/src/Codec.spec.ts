import { describe, it, expect } from 'vitest';
import { Result } from './Result.js';
import { Codec, DecodeError, option, dateISO, array, object } from './Codec.js';
import { Option } from './Option.js';
import { assertType } from './testing.js';
import { Tag } from './Tag.js';
import { String as StringType } from './Type/String.js';
import { Int as IntType } from './Type/Int.js';
import type { Int } from './Int.js';

// Example of codec
const underscoreString = Codec<string>({
  codecEncode: (_) => `_${_}`,
  codecDecode: (input) =>
    typeof input === 'string' && input[0] === '_'
      ? Result.Ok(input.slice(1))
      : Result.Error(
          DecodeError({
            message: 'Invalid underscore string',
            input,
          })
        ),
  codecSchema: () => ({ type: 'string', format: 'custom_underscore' }),
});
describe('Codec', () => {
  describe('.encode()', () => {
    it('should call codecEncode', () => {
      const codec = {
        codecEncode: (_: string) => `test_${_}`,
      };
      expect(Codec.encode(codec, 'value')).toEqual('test_value');
    });
  });
  describe('.decode()', () => {
    it('should call codecEncode', () => {
      const codec = {
        codecDecode: (_: unknown) => Result.Ok(`test_${_}`),
      };
      expect(Codec.decode(codec, 'value')).toEqual(Result.Ok('test_value'));
    });
  });
});

describe('lazy', () => {
  const subject = Codec.lazy;
  const getCodec = () =>
    Codec<string>({
      codecEncode: (_) => `__${_}`,
      codecDecode: (_) => Result.Ok(String(_).slice(2)),
      codecSchema: () => ({ type: 'string', format: 'test' }),
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
describe('option', () => {
  const subject = option;

  describe('.codecSchema', () => {
    it('should return correct schema', () => {
      const optionalString = subject(underscoreString);
      expect(Codec.schema(optionalString)).toEqual({ type: 'string', format: 'custom_underscore' });
    });
  });
  describe('.codecEncode', () => {
    it.each([
      [Option.None, null],
      ['', '_'],
      ['abc', '_abc'],
    ])('should encode values', (input, expected) => {
      const optionalString = subject(underscoreString);
      expect(Codec.encode(optionalString, input)).toEqual(expected);
    });
  });
  describe('.codecDecode', () => {
    it.each([
      [undefined, Result.Ok(Option.None)],
      [null, Result.Ok(Option.None)],
      ['_', Result.Ok('')],
      ['_abc', Result.Ok('abc')],
    ])('should encode values', (input, expected) => {
      const optionalString = subject(underscoreString);
      expect(Codec.decode(optionalString, input)).toEqual(expected);
    });
  });
});
describe('array', () => {
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
describe('object', () => {
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
            message: 'Cannot decode undefined as String',
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
(() => {
  const Group = object({
    name: StringType,
  });
  interface Group extends Codec.TypeOf<typeof Group> {}

  type PersonId = string & Tag<'PersonId'>;
  const PersonId = Tag.define<string, PersonId>({
    typeName: 'PersonId',
    hasInstance(anyValue) {
      return typeof anyValue === 'string';
    },
  });

  const Person = object({
    id: PersonId,
    name: StringType,
    description: option(StringType),
    age: IntType,
    groups: array(Group),
    created: dateISO,
    updated: dateISO,
  });
  interface Person extends Codec.TypeOf<typeof Person> {}

  assertType<
    Person,
    {
      id: PersonId;
      name: string;
      description: Option<string>;
      age: Int;
      groups: ReadonlyArray<Group>;
      created: Date;
      updated: Date;
    }
  >(true);
})();
