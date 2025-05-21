import { describe, it, expect } from 'vitest';
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
    codecEncode: (_) => `_${_}`,
    codecDecode: (input, { ok, error }) =>
      typeof input === 'string' && input[0] === '_' ? ok(input.slice(1)) : error(input, 'UnderscoreString'),
    codecSchema: () => ({ type: 'any', format: 'custom_underscore' }),
  });
  describeType({ describe, it, expect })(subject({ foo: AnyType, bar: AnyType }, 'FooType'), {
    typeName: 'FooType',
    instances: () => [{ foo: 'foo_value', bar: 'bar_value' }],
    notInstances: () => [null, 1, '', {}, { foo: 'foo_value' }, { foo: 1, bar: 2 }],
  });
  describeCodec({ describe, it, expect })(subject({ foo: AnyType, bar: AnyType }), {
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
    schema: () => ({
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
    }),
  });
});
