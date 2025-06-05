import { describe } from 'vitest';
import { boolean } from './boolean.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';

describe('boolean', () => {
  describeType(boolean, {
    typeName: 'boolean',
    instances: () => [true, false],
    notInstances: () => ['', null, undefined],
  });
  describeCodec(boolean, {
    encode: [
      [true, true],
      [false, false],
    ],
    decode: [
      [true, Result.Ok(true)],
      [false, Result.Ok(false)],
      [undefined, Result.Error(new CodecError({ message: 'Cannot decode undefined as boolean', input: undefined }))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as boolean', input: null }))],
    ],
    schema: () => ({ type: 'boolean' }),
  });
});
