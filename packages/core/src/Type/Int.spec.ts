import { describe, it, expect } from 'vitest';
import { Int } from './Int.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';

describe('Int', () => {
  describeType({ describe, it, expect })(Int, {
    typeName: 'Int',
    instances: () => [0, 1, 2, -1, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    notInstances: () => ['1', 1.1, undefined, Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 1],
  });
  describeCodec({ describe, it, expect })(Int, {
    decode: [
      [1, Result.Ok(Int(1))],
      [1.1, Result.Error(new CodecError({ message: 'Cannot decode 1.1 as Int', input: 1.1 }))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as Int', input: null }))],
    ],
    encode: [
      [Int(0), 0],
      [Int(1), 1],
    ],
    schema: () => ({
      type: 'integer',
    }),
  });
});
