import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { bigint } from './bigint.js';
import { string } from './string.js';
import { Tuple } from './Tuple.js';

describe(Tuple, () => {
  const subject = Tuple;

  describeType(subject(string, bigint), () => ({
    instances: [['toto', 1n] as const, ['', 2n] as const],
    notInstances: [null, 1, [1]],
    typeName: '[string,bigint]',
  }));
  describeCodec(subject(string, bigint), () => ({
    decode: [
      [['a', '1n'], Result.Ok(['a', 1n])],
      [
        ['a', '1'],
        Result.Error(
          new CodecError({
            input: ['a', '1'],
            message: 'Cannot decode a,1 as [string,bigint]',
          }),
        ),
      ],
    ],
    encode: [
      [
        ['a', 1n],
        ['a', '1n'],
      ],
    ],
    schema: { items: [{ type: 'string' }, { format: 'bigint', type: 'string' }], type: 'array' },
  }));
});
