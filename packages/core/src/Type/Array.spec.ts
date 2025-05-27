import { describe, it, expect } from 'vitest';
import { Array } from './Array.js';
import { describeCodec, describeType } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';
import { define } from './define.js';
import { Symbol } from '../Symbol.js';

describe(Array, () => {
  const subject = Array;

  const AnyType = define<string>({
    typeName: 'AnyType',
    hasInstance: (_) => typeof _ === 'string',
    [Symbol.encode]: (_) => `_${_}`,
    [Symbol.decode]: (input, { ok, error }) =>
      typeof input === 'string' && input[0] === '_' ? ok(input.slice(1)) : error(input, 'UnderscoreString'),
    [Symbol.schema]: () => ({ type: 'any', format: 'custom_underscore' }),
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
          new CodecError({
            message: 'Cannot decode "a" as UnderscoreString',
            input: 'a',
          }),
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
