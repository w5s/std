import { describe, it, expect } from 'vitest';
import { String } from './String.js';
import { describeType, describeCodec } from '../testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../Codec.js';

describe('String', () => {
  describeType({ describe, it, expect })(String, {
    typeName: 'String',
    instances: () => ['', 'hello world'],
    notInstances: () => [0, null, undefined],
  });
  describeCodec({ describe, it, expect })(String, {
    encode: [
      ['', ''],
      ['true', 'true'],
    ],
    decode: [
      ['', Result.Ok('')],
      ['hello world', Result.Ok('hello world')],
      [undefined, Result.Error(DecodeError({ message: 'Invalid String', input: undefined }))],
      [null, Result.Error(DecodeError({ message: 'Invalid String', input: null }))],
    ],
    schema: () => ({ type: 'string' }),
  });
});
