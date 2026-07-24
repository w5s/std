import { describe } from 'vitest';

import type { Codec } from '../Codec.js';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { Symbol } from '../Symbol.js';
import { describeCodec } from './describeCodec.js';

describe('describeCodec', () => {
  const StringCodec: Codec<string> = {
    [Symbol.decode]: (value) =>
      typeof value === 'string'
        ? Result.Ok(value)
        : Result.Error(
            new CodecError({
              input: value,
              message: 'test error',
            }),
          ),
    [Symbol.encode]: (value) => value,
    [Symbol.schema]: () => ({ type: 'string' }),
  };

  describeCodec(StringCodec, () => ({
    decode: [
      ['a', Result.Ok('a')],
      [1, Result.Error(new CodecError({ input: 1, message: 'test error' }))],
    ],
    encode: [
      ['a', 'a'],
      ['', ''],
    ],
    schema: {
      type: 'string',
    },
  }));
});
