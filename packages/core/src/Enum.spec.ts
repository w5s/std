import { describe, expect, it } from 'vitest';
import { Enum } from './Enum.js';
import { assertType, describeClass } from './testing.js';

describe('Enum', () => {
  const MyEnumObject = Enum.Make({
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

  describe('Make', () => {
    it('returns a new type', () => {
      expect(
        Enum.Make({
          Foo: 'foo',
          Bar: 'bar',
        })
      ).toEqual({
        Foo: 'foo',
        Bar: 'bar',
        hasInstance: expect.any(Function),
        [Enum.enumKeys]: ['Foo', 'Bar'],
        [Enum.enumValues]: ['foo', 'bar'],
      });
    });
    describeClass({ describe, it, expect })(MyEnumObject, {
      instances: () => [MyEnumObject.Foo, MyEnumObject.Bar],
      notInstances: () => ['anything', null, undefined, MyEnumObject.hasInstance],
    });
    // it('implements Codec', () => {
    //   expect(Codec.encode(MyEnum, MyEnum.Foo)).toEqual('foo');
    //   expect(Codec.decode(MyEnum, MyEnum.Foo)).toEqual(Result.Ok('foo'));
    //   expect(Codec.decode(MyEnum, 'not_in_enum')).toEqual(
    //     Result.Error(
    //       DecodeError({
    //         message: '',
    //         input: 'not_in_enum',
    //       })
    //     )
    //   );
    // });
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
