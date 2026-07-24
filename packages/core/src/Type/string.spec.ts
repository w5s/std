import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { string } from './string.js';

describe('string', () => {
  describeType(string, () => ({
    instances: ['', 'hello world'],
    notInstances: [0, null, undefined],
    typeName: 'string',
  }));
  describeCodec(string, () => ({
    decode: [
      ['', Result.Ok('')],
      ['hello world', Result.Ok('hello world')],
      [undefined, Result.Error(new CodecError({ input: undefined, message: 'Cannot decode undefined as string' }))],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as string' }))],
    ],
    encode: [
      ['', ''],
      ['true', 'true'],
    ],
    schema: { type: 'string' },
  }));
});
