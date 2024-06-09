import { describe, it, expect } from 'vitest';
import { String } from './String.js';
import { describeType, describeCodec } from '../testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';

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
      [undefined, Result.Error(DecodeError({ message: 'Cannot decode undefined as String', input: undefined }))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as String', input: null }))],
    ],
    schema: () => ({ type: 'string' }),
  });
});
