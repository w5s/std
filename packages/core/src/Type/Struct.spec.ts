import { describe, it, expect } from 'vitest';
import { Result } from '../Result.js';
import { DecodeError } from '../Codec.js';
import { describeCodec, describeType } from '../testing.js';
import { define } from './define.js';
import { Struct } from './Struct.js';

describe(Struct, () => {
  const subject = Struct;
  const AnyType = define<string>({
    typeName: 'AnyType',
    hasInstance: (_) => typeof _ === 'string',
    codecEncode: (_) => `_${_}`,
    codecDecode: (input, { ok, error }) =>
      typeof input === 'string' && input[0] === '_' ? ok(input.slice(1)) : error('Invalid underscore string'),
    codecSchema: () => ({ type: 'any', format: 'custom_underscore' }),
  });
  describeType({ describe, it, expect })(subject({ foo: AnyType, bar: AnyType }), {
    typeName: 'Struct',
    instances: () => [{ foo: 'foo_value', bar: 'bar_value' }],
    notInstances: () => [null, 1, '', {}, { foo: 'foo_value' }, { foo: 1, bar: 2 }],
  });
  describeCodec({ describe, it, expect })(subject({ foo: AnyType, bar: AnyType }), {
    decode: [
      [{ foo: '_a', bar: '_b' }, Result.Ok({ foo: 'a', bar: 'b' })],
      [
        { foo: '' },
        Result.Error(
          DecodeError({
            message: 'Invalid underscore string',
            input: '',
          })
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
