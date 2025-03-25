import { describe, it, expect } from 'vitest';
import type { Codec } from '../Codec.js';
import { CodecError } from '../CodecError.js';
import { describeCodec } from './describeCodec.js';
import { Result } from '../Result.js';

describe('describeCodec', () => {
  const StringCodec: Codec<string> = {
    codecEncode: (value) => value,
    codecDecode: (value) =>
      typeof value === 'string'
        ? Result.Ok(value)
        : Result.Error(
            new CodecError({
              message: 'test error',
              input: value,
            }),
          ),
    codecSchema: () => ({ type: 'string' }),
  };

  describeCodec({ describe, it, expect })(StringCodec, {
    encode: [
      ['a', 'a'],
      ['', ''],
    ],
    decode: [
      ['a', Result.Ok('a')],
      [1, Result.Error(new CodecError({ input: 1, message: 'test error' }))],
    ],
    schema: () => ({
      type: 'string',
    }),
  });
});
