import { describe, expect, it } from 'vitest';
import { Enum } from './Enum.js';
import { assertType } from './testing.js';

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
        [Enum.enumKeys]: ['Foo', 'Bar'],
        [Enum.enumValues]: ['foo', 'bar'],
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
