import { assertType } from '@w5s/core-type';
import { describe, expect, it } from 'vitest';

import type { Enum } from '../Enum.js';

import { CodecError } from '../CodecError.js';
import { Option } from '../Option.js';
import { Result } from '../Result.js';
import { Symbol } from '../Symbol.js';
import { describeCodec, describeIndexable, describeType } from '../Testing.js';
import { define } from './define.js';

describe(define, () => {
  const MyEnumObject = define({
    Bar: 'bar',
    Baz: 'baz',
    Foo: 'foo',
    typeName: 'MyEnumObject',
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
  assertType<MyEnum, 'bar' | 'baz' | 'foo'>(true);

  type MyEnumKeys = Enum.KeyOf<typeof MyEnumObject>;
  assertType<MyEnumKeys, 'Bar' | 'Baz' | 'Foo'>(true);

  it('returns a new type', () => {
    expect(
      define({
        Bar: 'bar',
        Baz: 'baz',
        Foo: 'foo',
      }),
    ).toEqual({
      __decode__: expect.any(Function),
      __encode__: expect.any(Function),
      __schema__: expect.any(Function),
      asInstance: expect.any(Function),
      asString: expect.any(Function),
      at: expect.any(Function),
      Bar: 'bar',
      Baz: 'baz',
      Foo: 'foo',
      hasInstance: expect.any(Function),
      indexOf: expect.any(Function),
      indexType: 'number',
      inspect: Option.None,
      range: expect.any(Function),
      rangeSize: expect.any(Function),
      [Symbol.enumKeys]: ['Bar', 'Baz', 'Foo'],
      typeName: expect.any(String),
    });
  });
  it('generates a default typeName', () => {
    expect(
      define({
        Bar: 'bar',
        Baz: 'baz',
        Foo: 'foo',
      }),
    ).toEqual(
      expect.objectContaining({
        typeName: 'bar|baz|foo',
      }),
    );
  });

  describeType(MyEnumObject, () => ({
    instances: [MyEnumObject.Foo, MyEnumObject.Bar],
    notInstances: ['anything', null, undefined, MyEnumObject.hasInstance],
    typeName: 'MyEnumObject',
  }));
  describeCodec(MyEnumObject, () => ({
    decode: [
      ['foo', Result.Ok(MyEnumObject.Foo)],
      ['bar', Result.Ok(MyEnumObject.Bar)],
      [
        'foo_invalid',
        Result.Error(new CodecError({ input: 'foo_invalid', message: 'Cannot decode "foo_invalid" as MyEnumObject' })),
      ],
    ],
    encode: [
      [MyEnum.Foo, 'foo'],
      [MyEnum.Bar, 'bar'],
    ],
    schema: {
      enum: ['bar', 'baz', 'foo'],
    },
  }));
  describeIndexable(MyEnumObject, {
    index: [
      [0, MyEnumObject.Bar],
      [1, MyEnumObject.Baz],
      [2, MyEnumObject.Foo],
    ],
    range: [
      [MyEnumObject.Foo, MyEnumObject.Foo, [MyEnumObject.Foo]],
      [MyEnumObject.Baz, MyEnumObject.Foo, [MyEnumObject.Baz, MyEnumObject.Foo]],
      [MyEnumObject.Bar, MyEnumObject.Foo, [MyEnumObject.Bar, MyEnumObject.Baz, MyEnumObject.Foo]],
    ],
  });
});
