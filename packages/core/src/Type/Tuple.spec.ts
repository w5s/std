import { describe, it, expect } from 'vitest';
import { Tuple } from './Tuple.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';
import { bigint as TBigInt } from './BigInt.js';
import { string as TString } from './String.js';

describe(Tuple, () => {
  const subject = Tuple;

  describeType({ describe, it, expect })(subject(TString, TBigInt), {
    typeName: '[string,bigint]',
    instances: () => [['toto', 1n] as const, ['', 2n] as const],
    notInstances: () => [null, 1, [1]],
  });
  describeCodec({ describe, it, expect })(subject(TString, TBigInt), {
    decode: [
      [['a', '1n'], Result.Ok(['a', 1n])],
      [
        ['a', '1'],
        Result.Error(
          DecodeError({
            message: 'Cannot decode a,1 as [string,bigint]',
            input: 'a',
          })
        ),
      ],
    ],
    encode: [
      [
        ['a', 1n],
        ['a', '1n'],
      ],
    ],
    schema: () => ({ type: 'array', items: [{ type: 'string' }, { type: 'string', format: 'bigint' }] }),
  });
});
