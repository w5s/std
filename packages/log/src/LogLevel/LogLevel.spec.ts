import { CodecError, Int, Result } from '@w5s/core';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { LogLevel } from './LogLevel.js';

describe('LogLevel', () => {
  describeType(LogLevel, () => ({
    inspect: [
      [LogLevel.create({ name: 'UberCritical', value: Int(60) }), 'UberCritical[60]'],
      [LogLevel.create({ name: 'Critical', value: Int(50) }), 'Critical[50]'],
    ],
    instances: [LogLevel.create({ name: 'UberCritical', value: Int(60) })],
    notInstances: [undefined],
    typeName: 'LogLevel',
  }));
  describeCodec(LogLevel, () => ({
    decode: [
      ['UberCritical[60]', Result.Ok(LogLevel.create({ name: 'UberCritical', value: Int(60) }))],
      ['Critical[50]', Result.Ok(LogLevel.create({ name: 'Critical', value: Int(50) }))],
      ['', Result.Error(new CodecError({ input: '', message: 'Cannot decode "" as LogLevel' }))],
      ['[50]', Result.Error(new CodecError({ input: '[50]', message: 'Cannot decode "[50]" as LogLevel' }))],
      [
        'Critical[abc]',
        Result.Error(new CodecError({ input: 'Critical[abc]', message: 'Cannot decode "Critical[abc]" as LogLevel' })),
      ],
    ],
    encode: [
      [LogLevel.create({ name: 'UberCritical', value: Int(60) }), 'UberCritical[60]'],
      [LogLevel.create({ name: 'Critical', value: Int(50) }), 'Critical[50]'],
    ],
    schema: {
      format: 'LogLevel',
      type: 'string',
    },
  }));
});
