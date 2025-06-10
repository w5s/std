import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { CodecError, Int, Result } from '@w5s/core';
import { LogLevel } from './LogLevel.js';

describe('LogLevel', () => {
  describeType(LogLevel, () => ({
    typeName: 'LogLevel',
    instances: [LogLevel.create({ name: 'UberCritical', value: Int(60) })],
    notInstances: [undefined],
    inspect: [
      [LogLevel.create({ name: 'UberCritical', value: Int(60) }), 'UberCritical[60]'],
      [LogLevel.create({ name: 'Critical', value: Int(50) }), 'Critical[50]'],
    ],
  }));
  describeCodec(LogLevel, () => ({
    decode: [
      ['UberCritical[60]', Result.Ok(LogLevel.create({ name: 'UberCritical', value: Int(60) }))],
      ['Critical[50]', Result.Ok(LogLevel.create({ name: 'Critical', value: Int(50) }))],
      ['', Result.Error(new CodecError({ message: 'Cannot decode "" as LogLevel', input: '' }))],
      ['[50]', Result.Error(new CodecError({ message: 'Cannot decode "[50]" as LogLevel', input: '[50]' }))],
      [
        'Critical[abc]',
        Result.Error(new CodecError({ message: 'Cannot decode "Critical[abc]" as LogLevel', input: 'Critical[abc]' })),
      ],
    ],
    encode: [
      [LogLevel.create({ name: 'UberCritical', value: Int(60) }), 'UberCritical[60]'],
      [LogLevel.create({ name: 'Critical', value: Int(50) }), 'Critical[50]'],
    ],
    schema: {
      type: 'string',
      format: 'LogLevel',
    },
  }));
});
