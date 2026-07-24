import { CodecError, Result } from '@w5s/core';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { TimeDuration } from './TimeDuration.js';

describe('TimeDuration', () => {
  describeType(TimeDuration, () => ({
    instances: [-1 as TimeDuration, 0 as TimeDuration, 1 as TimeDuration],
    notInstances: [null, undefined, [], NaN],
    typeName: 'TimeDuration',
  }));
  describeCodec(TimeDuration, () => ({
    decode: [
      [0, Result.Ok(TimeDuration(0))],
      [
        null,
        Result.Error(
          new CodecError({
            input: null,
            message: 'Cannot decode null as TimeDuration',
          }),
        ),
      ],
    ],
    encode: [
      [TimeDuration(1), 1],
      [TimeDuration(0), 0],
    ],
    schema: {
      type: 'number',
    },
  }));
});
