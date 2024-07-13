import { describe, it, expect } from 'vitest';
import { BigInt } from './BigInt.js';
import { describeCodec, describeType } from '../Testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';

describe('BigInt', () => {
  describeType({ describe, it, expect })(BigInt, {
    typeName: 'BigInt',
    instances: () => [1n, 0n],
    notInstances: () => ['anything', null, undefined, BigInt.hasInstance],
  });
  describeCodec({ describe, it, expect })(BigInt, {
    encode: [
      [0n, '0n'],
      [1n, '1n'],
    ],
    decode: [
      ['1n', Result.Ok(1n)],
      ['-2n', Result.Ok(-2n)],
      ['2', Result.Error(DecodeError({ message: 'Cannot decode 2 as BigInt', input: '2' }))],
      ['2.1n', Result.Error(DecodeError({ message: 'Cannot decode 2.1n as BigInt', input: '2.1n' }))],
      [undefined, Result.Error(DecodeError({ message: 'Cannot decode undefined as BigInt', input: undefined }))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as BigInt', input: null }))],
    ],
    schema: () => ({ type: 'string', format: 'bigint' }),
  });
});
