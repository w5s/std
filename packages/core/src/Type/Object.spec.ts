import { describe } from 'vitest';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';
import { describeCodec, describeType } from '../Testing.js';
import { define } from './define.js';
import { TObject } from './Object.js';

describe(TObject, () => {
  const subject = TObject;
  const AnyType = define<string>({
    typeName: 'AnyType',
    hasInstance: (_) => typeof _ === 'string',
    __encode__: (_) => `_${_}`,
    __decode__: (input, { ok, error }) =>
      typeof input === 'string' && input[0] === '_' ? ok(input.slice(1)) : error(input, 'UnderscoreString'),
    __schema__: () => ({ type: 'any', format: 'custom_underscore' }),
  });
  describeType(subject({ foo: AnyType, bar: AnyType }, 'FooType'), () => ({
    typeName: 'FooType',
    instances: [{ foo: 'foo_value', bar: 'bar_value' }],
    notInstances: [null, 1, '', {}, { foo: 'foo_value' }, { foo: 1, bar: 2 }],
  }));
  describeCodec(subject({ foo: AnyType, bar: AnyType }), () => ({
    decode: [
      [{ foo: '_a', bar: '_b' }, Result.Ok({ foo: 'a', bar: 'b' })],
      [
        { foo: 'a' },
        Result.Error(
          new CodecError({
            message: 'Cannot decode "a" as UnderscoreString',
            input: 'a',
          }),
        ),
      ],
    ],
    encode: [
      [
        { foo: 'a', bar: 'b' },
        { foo: '_a', bar: '_b' },
      ],
    ],
    schema: {
      type: 'object',
      required: [],
      properties: {
        foo: {
          type: 'any',
          format: 'custom_underscore',
        },
        bar: {
          type: 'any',
          format: 'custom_underscore',
        },
      },
    },
  }));
});
