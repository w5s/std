import { describe, it, expect } from 'vitest';
import { Array } from './Array.js';
import { describeCodec, describeType } from '../testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../Codec.js';
import { define } from './define.js';

describe(Array, () => {
  const subject = Array;

  const AnyType = define<string>({
    typeName: 'AnyType',
    hasInstance: (_) => typeof _ === 'string',
    codecEncode: (_) => `_${_}`,
    codecDecode: (input, { ok, error }) =>
      typeof input === 'string' && input[0] === '_' ? ok(input.slice(1)) : error('Invalid underscore string'),
    codecSchema: () => ({ type: 'any', format: 'custom_underscore' }),
  });

  describeType({ describe, it, expect })(subject(AnyType), {
    typeName: 'Array<AnyType>',
    instances: () => [[], ['']],
    notInstances: () => [null, 1, [1]],
  });
  describeCodec({ describe, it, expect })(subject(AnyType), {
    decode: [
      [['_a', '_b', '_c'], Result.Ok(['a', 'b', 'c'])],
      [
        ['a', '_b', '_c'],
        Result.Error(
          DecodeError({
            message: 'Invalid underscore string',
            input: 'a',
          })
        ),
      ],
    ],
    encode: [
      [
        ['a', 'b', 'c'],
        ['_a', '_b', '_c'],
      ],
    ],
    schema: () => ({ type: 'array', item: { type: 'any', format: 'custom_underscore' } }),
  });
});
