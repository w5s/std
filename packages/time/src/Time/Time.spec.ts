import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe, it, expect } from 'vitest';
import { DecodeError, Result } from '@w5s/core';
import { Time } from './Time.js';
import { TimeBounded } from './TimeBounded.js';

describe('Time', () => {
  describeType({ describe, it, expect })(Time, {
    typeName: 'Time',
    instances: () => [TimeBounded.minValue, Time(-1), Time(0), Time(1), TimeBounded.maxValue],
    notInstances: () => [null, undefined, [], Number.NaN],
  });
  describeCodec({ describe, it, expect })(Time, {
    encode: [
      [Time(1), 1],
      [Time(0), 0],
    ],
    decode: [
      [0, Result.Ok(Time(0))],
      [
        null,
        Result.Error(
          DecodeError({
            message: 'Cannot decode null as Time',
            input: null,
          }),
        ),
      ],
    ],
    schema: () => ({
      type: 'number',
    }),
  });
});
