import { describe, it, expect } from 'vitest';
import { boolean } from './boolean.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';

describe('boolean', () => {
  describeType({ describe, it, expect })(boolean, {
    typeName: 'boolean',
    instances: () => [true, false],
    notInstances: () => ['', null, undefined],
  });
  describeCodec({ describe, it, expect })(boolean, {
    encode: [
      [true, true],
      [false, false],
    ],
    decode: [
      [true, Result.Ok(true)],
      [false, Result.Ok(false)],
      [undefined, Result.Error(DecodeError({ message: 'Cannot decode undefined as boolean', input: undefined }))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as boolean', input: null }))],
    ],
    schema: () => ({ type: 'boolean' }),
  });
});