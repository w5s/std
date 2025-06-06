import { describe } from 'vitest';
import { bigint } from './bigint.js';
import { describeCodec, describeType } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';

describe('bigint', () => {
  describeType(bigint, () => ({
    typeName: 'bigint',
    instances: [1n, 0n],
    notInstances: ['anything', null, undefined, bigint.hasInstance],
  }));
  describeCodec(bigint, () => ({
    encode: [
      [0n, '0n'],
      [1n, '1n'],
    ],
    decode: [
      ['1n', Result.Ok(1n)],
      ['-2n', Result.Ok(-2n)],
      ['2', Result.Error(new CodecError({ message: 'Cannot decode "2" as bigint', input: '2' }))],
      ['2.1n', Result.Error(new CodecError({ message: 'Cannot decode "2.1n" as bigint', input: '2.1n' }))],
      [undefined, Result.Error(new CodecError({ message: 'Cannot decode undefined as bigint', input: undefined }))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as bigint', input: null }))],
    ],
    schema: { type: 'string', format: 'bigint' },
  }));
});
