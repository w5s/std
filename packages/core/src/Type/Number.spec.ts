import { describe, it, expect } from 'vitest';
import { Number } from './Number.js';
import { describeType, describeCodec } from '../testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../Codec.js';

describe('Number', () => {
  describeType({ describe, it, expect })(Number, {
    typeName: 'Number',
    instances: () => [1, 1],
    notInstances: () => ['', null, undefined],
  });
  describeCodec({ describe, it, expect })(Number, {
    encode: [
      [1, 1],
      [0, 0],
    ],
    decode: [
      [1, Result.Ok(1)],
      [0, Result.Ok(0)],
      [undefined, Result.Error(DecodeError({ message: 'Cannot decode undefined as Number', input: undefined }))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as Number', input: null }))],
    ],
    schema: () => ({ type: 'number' }),
  });
});
