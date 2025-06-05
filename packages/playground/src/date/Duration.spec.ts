import { describeType, describeCodec } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { CodecError, Int, Result } from '@w5s/core';
import { Duration } from './Duration.js';

describe('Duration', () => {
  describeType(Duration, {
    typeName: 'Duration',
    instances: () => [
      Duration({
        years: Int(1),
        months: Int(2),
        weeks: Int(3),
        days: Int(4),
        hours: Int(5),
        minutes: Int(6),
        seconds: 7,
      }),
    ],
    notInstances: () => ['1', 1.1, undefined, {}],
  });
  describeCodec(Duration, () => ({
    decode: [
      [
        'P2Y4M3W6DT14H30M20.42S',
        Result.Ok(
          Duration({
            years: Int(2),
            months: Int(4),
            weeks: Int(3),
            days: Int(6),
            hours: Int(14),
            minutes: Int(30),
            seconds: 20.42,
          }),
        ),
      ],
      // Invalid inputs
      ...['', 'P', 'PT'].map(
        (_) =>
          [_, Result.Error(new CodecError({ message: `Cannot decode "${_}" as Duration`, input: _ }))] as [
            string,
            Result<Duration, CodecError>,
          ],
      ),
    ],
    encode: [
      [
        Duration({ years: Int(1), months: Int(2), days: Int(3), hours: Int(4), minutes: Int(5), seconds: 6 }),
        'P1Y2M3DT4H5M6S',
      ],
      [Duration({ years: Int(1), months: Int(2), days: Int(3) }), 'P1Y2M3D'],
      [Duration({ hours: Int(4), minutes: Int(5), seconds: 6.2 }), 'PT4H5M6.2S'],
    ],
    schema: {
      type: 'string',
      format: 'duration',
    },
  }));
});
