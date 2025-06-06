import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { CodecError, Result } from '@w5s/core';
import { Time } from './Time.js';
import { TimeBounded } from './TimeBounded.js';

describe('Time', () => {
  describeType(Time, () => ({
    typeName: 'Time',
    instances: [TimeBounded.minValue, Time(-1), Time(0), Time(1), TimeBounded.maxValue],
    notInstances: [null, undefined, [], Number.NaN],
  }));
  describeCodec(Time, () => ({
    encode: [
      [Time(1), '1970-01-01T00:00:00.001Z'],
      [Time(0), '1970-01-01T00:00:00.000Z'],
    ],
    decode: [
      ['1970-01-01T00:00:00.000Z', Result.Ok(Time(0))],
      [
        null,
        Result.Error(
          new CodecError({
            message: 'Cannot decode null as Time',
            input: null,
          }),
        ),
      ],
    ],
    schema: {
      type: 'string',
      format: 'date-time',
    },
  }));
});
