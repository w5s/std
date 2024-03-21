import { describe, expect, it } from 'vitest';
import { Enum } from './enum.js';
import { assertType } from './testing.js';

describe('Enum', () => {
  const MyEnum = {
    ...Enum.Make({
      Foo: 'foo',
      Bar: 'bar',
    }),
    someMethod() {},
  };
  type MyEnum = Enum.ValueOf<typeof MyEnum>;
  assertType<MyEnum, 'foo' | 'bar'>(true);

  type MyEnumKeys = Enum.KeyOf<typeof MyEnum>;
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
