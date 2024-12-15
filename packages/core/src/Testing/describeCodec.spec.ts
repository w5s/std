import { describe, it, expect } from 'vitest';
import type { Codec } from '../Codec.js';
import { DecodeError } from '../DecodeError.js';
import { describeCodec } from './describeCodec.js';
import { Result } from '../Result.js';

describe('describeCodec', () => {
  const StringCodec: Codec<string> = {
    codecEncode: (value) => value,
    codecDecode: (value) =>
      typeof value === 'string'
        ? Result.Ok(value)
        : Result.Error(
            DecodeError({
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
      [1, Result.Error(DecodeError({ input: 1, message: 'test error' }))],
    ],
    schema: () => ({
      type: 'string',
    }),
  });
});
