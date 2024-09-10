import { describe, it, expect } from 'vitest';
import { string } from './string.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';

describe('string', () => {
  describeType({ describe, it, expect })(string, {
    typeName: 'string',
    instances: () => ['', 'hello world'],
    notInstances: () => [0, null, undefined],
  });
  describeCodec({ describe, it, expect })(string, {
    encode: [
      ['', ''],
      ['true', 'true'],
    ],
    decode: [
      ['', Result.Ok('')],
      ['hello world', Result.Ok('hello world')],
      [undefined, Result.Error(DecodeError({ message: 'Cannot decode undefined as string', input: undefined }))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as string', input: null }))],
    ],
    schema: () => ({ type: 'string' }),
  });
});