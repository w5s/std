import { describe, expect, it } from 'vitest';
import { assertType, describeCodec, describeType } from '../Testing.js';
import { define } from './define.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';
import type { Enum } from '../Enum.js';
import { Symbol } from '../Symbol.js';

describe(define, () => {
  const MyEnumObject = define({
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

  it('returns a new type', () => {
    expect(
      define({
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
      from: expect.any(Function),
      [Symbol.enumKeys]: ['Foo', 'Bar'],
      [Symbol.enumValues]: ['foo', 'bar'],
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
        Result.Error(DecodeError({ message: 'Cannot decode foo_invalid as Enum', input: 'foo_invalid' })),
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
