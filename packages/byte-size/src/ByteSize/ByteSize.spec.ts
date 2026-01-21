import { describe } from 'vitest';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { CodecError, Result } from '@w5s/core';
import { ByteSize } from './ByteSize.js';

describe(ByteSize, () => {
  describeType(ByteSize, () => ({
    typeName: 'ByteSize',
    instances: [ByteSize(1), ByteSize(0), ByteSize(1024)],
    notInstances: [null, undefined, [], Number.NaN],
  }));
  describeCodec(ByteSize, () => ({
    encode: [
      [ByteSize(1), '1 B'],
      [ByteSize(0), '0 B'],
      [ByteSize(512 * 1024), '512 KiB'],
      [ByteSize(22_020_096), '21 MiB'],
    ],
    decode: [
      ['0 B', Result.Ok(ByteSize(0))],
      ['1 KB', Result.Ok(ByteSize(1024))],
      ['21 MB', Result.Ok(ByteSize(22_020_096))],
      [
        null,
        Result.Error(
          new CodecError({
            message: 'Cannot decode null as ByteSize',
            input: null,
          }),
        ),
      ],
    ],
    schema: {
      type: 'string',
      format: 'file-size',
    },
  }));
});
