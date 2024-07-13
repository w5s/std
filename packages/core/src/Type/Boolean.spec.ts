import { describe, it, expect } from 'vitest';
import { Boolean } from './Boolean.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';

describe('Boolean', () => {
  describeType({ describe, it, expect })(Boolean, {
    typeName: 'Boolean',
    instances: () => [true, false],
    notInstances: () => ['', null, undefined],
  });
  describeCodec({ describe, it, expect })(Boolean, {
    encode: [
      [true, true],
      [false, false],
    ],
    decode: [
      [true, Result.Ok(true)],
      [false, Result.Ok(false)],
      [undefined, Result.Error(DecodeError({ message: 'Cannot decode undefined as Boolean', input: undefined }))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as Boolean', input: null }))],
    ],
    schema: () => ({ type: 'boolean' }),
  });
});
