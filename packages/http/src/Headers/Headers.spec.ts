/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { describe } from 'vitest';
import { describeType, describeCodec } from '@w5s/core/dist/Testing.js';
import { Result, CodecError } from '@w5s/core';
import { Headers } from './Headers.js';

describe('Headers', () => {
  describeType(Headers, () => ({
    typeName: 'Headers',
    instances: [{}, { 'Content-Type': 'application/json' } as Headers],
    notInstances: ['1', 1.1, undefined, { foo: 1 }],
  }));
  describeCodec(Headers, () => ({
    decode: [
      [{}, Result.Ok({})],
      [{ foo: 'bar' }, Result.Ok({ foo: 'bar' })],
      [1.1, Result.Error(new CodecError({ message: 'Cannot decode 1.1 as Record<string,string>', input: 1.1 }))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as Record<string,string>', input: null }))],
    ],
    encode: [[{ foo: 'bar' }, { foo: 'bar' }]],
    schema: {
      type: 'object',
    },
  }));
});
