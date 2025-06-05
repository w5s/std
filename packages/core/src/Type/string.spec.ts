import { describe } from 'vitest';
import { string } from './string.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';

describe('string', () => {
  describeType(string, {
    typeName: 'string',
    instances: () => ['', 'hello world'],
    notInstances: () => [0, null, undefined],
  });
  describeCodec(string, {
    encode: [
      ['', ''],
      ['true', 'true'],
    ],
    decode: [
      ['', Result.Ok('')],
      ['hello world', Result.Ok('hello world')],
      [undefined, Result.Error(new CodecError({ message: 'Cannot decode undefined as string', input: undefined }))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as string', input: null }))],
    ],
    schema: () => ({ type: 'string' }),
  });
});
