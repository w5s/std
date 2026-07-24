import { CodecError, Result } from '@w5s/core';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { ByteSize } from './ByteSize.js';

describe(ByteSize, () => {
  describeType(ByteSize, () => ({
    instances: [ByteSize(1), ByteSize(0), ByteSize(1024)],
    notInstances: [null, undefined, [], NaN],
    typeName: 'ByteSize',
  }));
  describeCodec(ByteSize, () => ({
    decode: [
      ['0 B', Result.Ok(ByteSize(0))],
      ['1 KB', Result.Ok(ByteSize(1000))],
      ['21 MB', Result.Ok(ByteSize(21_000_000))],
      [
        null,
        Result.Error(
          new CodecError({
            input: null,
            message: 'Cannot decode null as ByteSize',
          }),
        ),
      ],
    ],
    encode: [
      [ByteSize(1), '1 B'],
      [ByteSize(0), '0 B'],
      [ByteSize(512 * 1000), '512 KB'],
      [ByteSize(21_000_000), '21 MB'],
    ],
    schema: {
      format: 'byte-size',
      type: 'string',
    },
  }));
});
