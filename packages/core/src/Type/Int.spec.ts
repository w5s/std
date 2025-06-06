import { describe } from 'vitest';
import { Int } from './Int.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';

describe('Int', () => {
  describeType(Int, () => ({
    typeName: 'Int',
    instances: [Int(0), Int(1), Int(2), Int(-1), Int(Number.MIN_SAFE_INTEGER), Int(Number.MAX_SAFE_INTEGER)],
    notInstances: ['1', 1.1, undefined, Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 1],
  }));
  describeCodec(Int, () => ({
    decode: [
      [1, Result.Ok(Int(1))],
      [1.1, Result.Error(new CodecError({ message: 'Cannot decode 1.1 as Int', input: 1.1 }))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as Int', input: null }))],
    ],
    encode: [
      [Int(0), 0],
      [Int(1), 1],
    ],
    schema: {
      type: 'integer',
    },
  }));
});
