import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { Result, CodecError } from '@w5s/core';
import { TimeDuration } from './TimeDuration.js';

describe('TimeDuration', () => {
  describeType(TimeDuration, () => ({
    typeName: 'TimeDuration',
    instances: [-1 as TimeDuration, 0 as TimeDuration, 1 as TimeDuration],
    notInstances: [null, undefined, [], Number.NaN],
  }));
  describeCodec(TimeDuration, () => ({
    encode: [
      [TimeDuration(1), 1],
      [TimeDuration(0), 0],
    ],
    decode: [
      [0, Result.Ok(TimeDuration(0))],
      [
        null,
        Result.Error(
          new CodecError({
            message: 'Cannot decode null as TimeDuration',
            input: null,
          }),
        ),
      ],
    ],
    schema: {
      type: 'number',
    },
  }));
});
