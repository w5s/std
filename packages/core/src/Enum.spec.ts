import { describe, expect, it } from 'vitest';
import { Enum } from './Enum.js';
import { assertType, describeCodec, describeType } from './testing.js';
import { DecodeError } from './Codec.js';
import { Result } from './Result.js';

describe('Enum', () => {
  const MyEnumObject = Enum.define({
    Foo: 'foo',
    Bar: 'bar',
  });
  const MyEnum = {
    ...MyEnumObject,
    label(value: MyEnum): string {
      switch (value) {
        case MyEnumObject.Foo: {
          return 'foo_label';
        }
        default: {
          return 'bar_label';
        }
      }
    },
  };
  type MyEnum = Enum.ValueOf<typeof MyEnumObject>;
  assertType<MyEnum, 'foo' | 'bar'>(true);

  type MyEnumKeys = Enum.KeyOf<typeof MyEnumObject>;
  assertType<MyEnumKeys, 'Foo' | 'Bar'>(true);

  describe('define', () => {
    it('returns a new type', () => {
      expect(
        Enum.define({
          Foo: 'foo',
          Bar: 'bar',
        })
      ).toEqual({
        Foo: 'foo',
        Bar: 'bar',
        typeName: expect.any(String),
        hasInstance: expect.any(Function),
        codecSchema: expect.any(Function),
        codecDecode: expect.any(Function),
        codecEncode: expect.any(Function),
        [Enum.enumKeys]: ['Foo', 'Bar'],
        [Enum.enumValues]: ['foo', 'bar'],
      });
    });
    describeType({ describe, it, expect })(MyEnumObject, {
      typeName: 'Enum',
      instances: () => [MyEnumObject.Foo, MyEnumObject.Bar],
      notInstances: () => ['anything', null, undefined, MyEnumObject.hasInstance],
    });
    describeCodec({ describe, it, expect })(MyEnumObject, {
      decode: [
        ['foo', Result.Ok(MyEnumObject.Foo)],
        ['bar', Result.Ok(MyEnumObject.Bar)],
        [
          'foo_invalid',
          Result.Error(DecodeError({ message: 'foo_invalid is not a valid Enum', input: 'foo_invalid' })),
        ],
      ],
      encode: [
        [MyEnum.Foo, 'foo'],
        [MyEnum.Bar, 'bar'],
      ],
      schema: () => ({
        enum: ['foo', 'bar'],
      }),
    });
  });
  describe('keys', () => {
    it('returns the keys of Enum', () => {
      const actual = Enum.keys(MyEnum);
      expect(actual).toEqual(['Foo', 'Bar']);
    });
  });
  describe('values', () => {
    it('returns the values of Enum', () => {
      const actual = Enum.values(MyEnum);
      expect(actual).toEqual(['foo', 'bar']);
    });
  });
});
