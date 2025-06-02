import { describe, expect, it } from 'vitest';
import { assertType } from '@w5s/core-type';
import { describeCodec, describeIndexable, describeType } from '../Testing.js';
import { define } from './define.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';
import type { Enum } from '../Enum.js';
import { Symbol } from '../Symbol.js';
import { Option } from '../Option.js';

describe(define, () => {
  const MyEnumObject = define({
    typeName: 'MyEnumObject',
    Foo: 'foo',
    Bar: 'bar',
    Baz: 'baz',
  });
  const MyEnum = {
    ...MyEnumObject,
    label(value: MyEnum): string {
      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
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
  assertType<MyEnum, 'foo' | 'bar' | 'baz'>(true);

  type MyEnumKeys = Enum.KeyOf<typeof MyEnumObject>;
  assertType<MyEnumKeys, 'Foo' | 'Bar' | 'Baz'>(true);

  it('returns a new type', () => {
    expect(
      define({
        Foo: 'foo',
        Bar: 'bar',
        Baz: 'baz',
      }),
    ).toEqual({
      Foo: 'foo',
      Bar: 'bar',
      Baz: 'baz',
      typeName: expect.any(String),
      hasInstance: expect.any(Function),
      __schema__: expect.any(Function),
      __decode__: expect.any(Function),
      __encode__: expect.any(Function),
      asInstance: expect.any(Function),
      asString: expect.any(Function),
      [Symbol.enumKeys]: ['Foo', 'Bar', 'Baz'],
      at: expect.any(Function),
      indexType: 'number',
      indexOf: expect.any(Function),
      range: expect.any(Function),
      rangeSize: expect.any(Function),
      inspect: Option.None,
    });
  });
  it('generates a default typeName', () => {
    expect(
      define({
        Foo: 'foo',
        Bar: 'bar',
        Baz: 'baz',
      }),
    ).toEqual(
      expect.objectContaining({
        typeName: 'foo|bar|baz',
      }),
    );
  });

  describeType({ describe, it, expect })(MyEnumObject, {
    typeName: 'MyEnumObject',
    instances: () => [MyEnumObject.Foo, MyEnumObject.Bar],
    notInstances: () => ['anything', null, undefined, MyEnumObject.hasInstance],
  });
  describeCodec({ describe, it, expect })(MyEnumObject, {
    decode: [
      ['foo', Result.Ok(MyEnumObject.Foo)],
      ['bar', Result.Ok(MyEnumObject.Bar)],
      [
        'foo_invalid',
        Result.Error(new CodecError({ message: 'Cannot decode "foo_invalid" as MyEnumObject', input: 'foo_invalid' })),
      ],
    ],
    encode: [
      [MyEnum.Foo, 'foo'],
      [MyEnum.Bar, 'bar'],
    ],
    schema: () => ({
      enum: ['foo', 'bar', 'baz'],
    }),
  });
  describeIndexable({ describe, it, expect })(MyEnumObject, {
    index: [
      [0, MyEnumObject.Foo],
      [1, MyEnumObject.Bar],
      [2, MyEnumObject.Baz],
    ],
    range: [
      [MyEnumObject.Foo, MyEnumObject.Foo, [MyEnumObject.Foo]],
      [MyEnumObject.Foo, MyEnumObject.Bar, [MyEnumObject.Foo, MyEnumObject.Bar]],
      [MyEnumObject.Foo, MyEnumObject.Baz, [MyEnumObject.Foo, MyEnumObject.Bar, MyEnumObject.Baz]],
    ],
  });
});
