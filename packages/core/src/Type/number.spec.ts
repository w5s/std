import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { number } from './number.js';

describe('Number', () => {
  describeType(number, () => ({
    instances: [1, 1],
    notInstances: ['', null, undefined],
    typeName: 'number',
  }));
  describeCodec(number, () => ({
    decode: [
      [1, Result.Ok(1)],
      [0, Result.Ok(0)],
      [undefined, Result.Error(new CodecError({ input: undefined, message: 'Cannot decode undefined as number' }))],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as number' }))],
    ],
    encode: [
      [1, 1],
      [0, 0],
    ],
    schema: { type: 'number' },
  }));
});
