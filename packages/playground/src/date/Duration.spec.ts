import { CodecError, Int, Result } from '@w5s/core';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Duration } from './Duration.js';

describe('Duration', () => {
  describeType(Duration, () => ({
    instances: [
      Duration({
        days: Int(4),
        hours: Int(5),
        minutes: Int(6),
        months: Int(2),
        seconds: 7,
        weeks: Int(3),
        years: Int(1),
      }),
    ],
    notInstances: ['1', 1.1, undefined, {}],
    typeName: 'Duration',
  }));
  describeCodec(Duration, () => ({
    decode: [
      [
        'P2Y4M3W6DT14H30M20.42S',
        Result.Ok(
          Duration({
            days: Int(6),
            hours: Int(14),
            minutes: Int(30),
            months: Int(4),
            seconds: 20.42,
            weeks: Int(3),
            years: Int(2),
          }),
        ),
      ],
      // Invalid inputs
      ...['', 'P', 'PT'].map(
        (_) =>
          [_, Result.Error(new CodecError({ input: _, message: `Cannot decode "${_}" as Duration` }))] as [
            string,
            Result<Duration, CodecError>,
          ],
      ),
    ],
    encode: [
      [
        Duration({ days: Int(3), hours: Int(4), minutes: Int(5), months: Int(2), seconds: 6, years: Int(1) }),
        'P1Y2M3DT4H5M6S',
      ],
      [Duration({ days: Int(3), months: Int(2), years: Int(1) }), 'P1Y2M3D'],
      [Duration({ hours: Int(4), minutes: Int(5), seconds: 6.2 }), 'PT4H5M6.2S'],
    ],
    schema: {
      format: 'duration',
      type: 'string',
    },
  }));
});
