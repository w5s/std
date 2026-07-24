import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { bigint } from './bigint.js';

describe('bigint', () => {
  describeType(bigint, () => ({
    instances: [1n, 0n],
    notInstances: ['anything', null, undefined, bigint.hasInstance],
    typeName: 'bigint',
  }));
  describeCodec(bigint, () => ({
    decode: [
      ['1n', Result.Ok(1n)],
      ['-2n', Result.Ok(-2n)],
      ['2', Result.Error(new CodecError({ input: '2', message: 'Cannot decode "2" as bigint' }))],
      ['2.1n', Result.Error(new CodecError({ input: '2.1n', message: 'Cannot decode "2.1n" as bigint' }))],
      [undefined, Result.Error(new CodecError({ input: undefined, message: 'Cannot decode undefined as bigint' }))],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as bigint' }))],
    ],
    encode: [
      [0n, '0n'],
      [1n, '1n'],
    ],
    schema: { format: 'bigint', type: 'string' },
  }));
});
