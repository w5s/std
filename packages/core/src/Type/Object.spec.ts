import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { define } from './define.js';
import { TObject } from './Object.js';

describe(TObject, () => {
  const subject = TObject;
  const AnyType = define<string>({
    __decode__: (input, { error, ok }) =>
      typeof input === 'string' && input[0] === '_' ? ok(input.slice(1)) : error(input, 'UnderscoreString'),
    __encode__: (_) => `_${_}`,
    __schema__: () => ({ format: 'custom_underscore', type: 'any' }),
    hasInstance: (_) => typeof _ === 'string',
    typeName: 'AnyType',
  });
  describeType(subject({ bar: AnyType, foo: AnyType }, 'FooType'), () => ({
    instances: [{ bar: 'bar_value', foo: 'foo_value' }],
    notInstances: [null, 1, '', {}, { foo: 'foo_value' }, { bar: 2, foo: 1 }],
    typeName: 'FooType',
  }));
  describeCodec(subject({ bar: AnyType, foo: AnyType }), () => ({
    decode: [
      [{ bar: '_b', foo: '_a' }, Result.Ok({ bar: 'b', foo: 'a' })],
      [
        { bar: '_b', foo: 'a' },
        Result.Error(
          new CodecError({
            input: 'a',
            message: 'Cannot decode "a" as UnderscoreString',
          }),
        ),
      ],
    ],
    encode: [
      [
        { bar: 'b', foo: 'a' },
        { bar: '_b', foo: '_a' },
      ],
    ],
    schema: {
      properties: {
        bar: {
          format: 'custom_underscore',
          type: 'any',
        },
        foo: {
          format: 'custom_underscore',
          type: 'any',
        },
      },
      required: [],
      type: 'object',
    },
  }));
});
