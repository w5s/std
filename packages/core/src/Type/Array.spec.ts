import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { Symbol } from '../Symbol.js';
import { describeCodec, describeType } from '../Testing.js';
import { Array } from './Array.js';
import { define } from './define.js';

describe(Array, () => {
  const subject = Array;

  const AnyType = define<string>({
    hasInstance: (_) => typeof _ === 'string',
    [Symbol.decode]: (input, { error, ok }) =>
      typeof input === 'string' && input[0] === '_' ? ok(input.slice(1)) : error(input, 'UnderscoreString'),
    [Symbol.encode]: (_) => `_${_}`,
    [Symbol.schema]: () => ({ format: 'custom_underscore', type: 'any' }),
    typeName: 'AnyType',
  });

  describeType(subject(AnyType), () => ({
    instances: [[], ['']],
    notInstances: [null, 1, [1]],
    typeName: 'Array<AnyType>',
  }));
  describeCodec(subject(AnyType), () => ({
    decode: [
      [['_a', '_b', '_c'], Result.Ok(['a', 'b', 'c'])],
      [
        ['a', '_b', '_c'],
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
        ['a', 'b', 'c'],
        ['_a', '_b', '_c'],
      ],
    ],
    schema: { item: { format: 'custom_underscore', type: 'any' }, type: 'array' },
  }));
});
