import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { boolean } from './boolean.js';

describe('boolean', () => {
  describeType(boolean, () => ({
    instances: [true, false],
    notInstances: ['', null, undefined],
    typeName: 'boolean',
  }));
  describeCodec(boolean, () => ({
    decode: [
      [true, Result.Ok(true)],
      [false, Result.Ok(false)],
      [undefined, Result.Error(new CodecError({ input: undefined, message: 'Cannot decode undefined as boolean' }))],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as boolean' }))],
    ],
    encode: [
      [true, true],
      [false, false],
    ],
    schema: { type: 'boolean' },
  }));
});
