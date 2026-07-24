import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { Int } from './Int.js';

describe('Int', () => {
  describeType(Int, () => ({
    instances: [Int(0), Int(1), Int(2), Int(-1), Int(Number.MIN_SAFE_INTEGER), Int(Number.MAX_SAFE_INTEGER)],
    notInstances: ['1', 1.1, undefined, Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 1, NaN, Infinity],
    typeName: 'Int',
  }));
  describeCodec(Int, () => ({
    decode: [
      [1, Result.Ok(Int(1))],
      [1.1, Result.Error(new CodecError({ input: 1.1, message: 'Cannot decode 1.1 as Int' }))],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as Int' }))],
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
