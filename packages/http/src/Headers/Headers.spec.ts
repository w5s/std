import { CodecError, Result } from '@w5s/core';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Headers } from './Headers.js';

describe('Headers', () => {
  describeType(Headers, () => ({
    instances: [{}, { 'Content-Type': 'application/json' } as Headers],
    notInstances: ['1', 1.1, undefined, { foo: 1 }],
    typeName: 'Headers',
  }));
  describeCodec(Headers, () => ({
    decode: [
      [{}, Result.Ok({})],
      [{ foo: 'bar' }, Result.Ok({ foo: 'bar' })],
      [1.1, Result.Error(new CodecError({ input: 1.1, message: 'Cannot decode 1.1 as Record<string,string>' }))],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as Record<string,string>' }))],
    ],
    encode: [[{ foo: 'bar' }, { foo: 'bar' }]],
    schema: {
      type: 'object',
    },
  }));
});
