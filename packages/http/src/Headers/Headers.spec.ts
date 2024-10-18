/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { describe, it, expect } from 'vitest';
import { describeType, describeCodec } from '@w5s/core/dist/Testing.js';
import { Result, DecodeError } from '@w5s/core';
import { Headers } from './Headers.js';

describe('Headers', () => {
  describeType({ describe, it, expect })(Headers, {
    typeName: 'Headers',
    instances: () => [{}, { 'Content-Type': 'application/json' } as Headers],
    notInstances: () => ['1', 1.1, undefined, { foo: 1 }],
  });
  describeCodec({ describe, it, expect })(Headers, {
    decode: [
      [{}, Result.Ok({})],
      [{ foo: 'bar' }, Result.Ok({ foo: 'bar' })],
      [1.1, Result.Error(DecodeError({ message: 'Cannot decode 1.1 as Record<string,string>', input: null }))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as Record<string,string>', input: null }))],
    ],
    encode: [[{ foo: 'bar' }, { foo: 'bar' }]],
    schema: () => ({
      type: 'object',
    }),
  });
});