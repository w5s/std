import { describe } from 'vitest';
import { Tuple } from './Tuple.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';
import { bigint } from './bigint.js';
import { string } from './string.js';

describe(Tuple, () => {
  const subject = Tuple;

  describeType(subject(string, bigint), {
    typeName: '[string,bigint]',
    instances: () => [['toto', 1n] as const, ['', 2n] as const],
    notInstances: () => [null, 1, [1]],
  });
  describeCodec(subject(string, bigint), () => ({
    decode: [
      [['a', '1n'], Result.Ok(['a', 1n])],
      [
        ['a', '1'],
        Result.Error(
          new CodecError({
            message: 'Cannot decode a,1 as [string,bigint]',
            input: ['a', '1'],
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
    schema: { type: 'array', items: [{ type: 'string' }, { type: 'string', format: 'bigint' }] },
  }));
});
