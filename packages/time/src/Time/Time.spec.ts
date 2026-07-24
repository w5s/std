import { CodecError, Result } from '@w5s/core';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Time } from './Time.js';
import { TimeBounded } from './TimeBounded.js';

describe('Time', () => {
  describeType(Time, () => ({
    instances: [TimeBounded.minValue, Time(-1), Time(0), Time(1), TimeBounded.maxValue],
    notInstances: [null, undefined, [], NaN],
    typeName: 'Time',
  }));
  describeCodec(Time, () => ({
    decode: [
      ['1970-01-01T00:00:00.000Z', Result.Ok(Time(0))],
      [
        null,
        Result.Error(
          new CodecError({
            input: null,
            message: 'Cannot decode null as Time',
          }),
        ),
      ],
    ],
    encode: [
      [Time(1), '1970-01-01T00:00:00.001Z'],
      [Time(0), '1970-01-01T00:00:00.000Z'],
    ],
    schema: {
      format: 'date-time',
      type: 'string',
    },
  }));
});
