import { describe, expect, it } from 'vitest';
import { Enum } from './Enum.js';
import { assertType, describeType } from './testing.js';
import { Codec, DecodeError } from './Codec.js';
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
    describe('Codec', () => {
      it('encodes values', () => {
        expect(Codec.encode(MyEnum, MyEnum.Foo)).toEqual('foo');
      });
      it('decodes values', () => {
        expect(Codec.decode(MyEnum, 'foo')).toEqual(Result.Ok(MyEnum.Foo));
        expect(Codec.decode(MyEnum, 'foo_invalid')).toEqual(
          Result.Error(DecodeError({ message: 'foo_invalid is not a valid Enum', input: 'foo_invalid' }))
        );
      });
      it('has schema', () => {
        expect(Codec.schema(MyEnum)).toEqual({ enum: ['foo', 'bar'] });
      });
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
