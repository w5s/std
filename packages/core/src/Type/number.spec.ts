import { describe, it, expect } from 'vitest';
import { number } from './number.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';

describe('Number', () => {
  describeType({ describe, it, expect })(number, {
    typeName: 'number',
    instances: () => [1, 1],
    notInstances: () => ['', null, undefined],
  });
  describeCodec({ describe, it, expect })(number, {
    encode: [
      [1, 1],
      [0, 0],
    ],
    decode: [
      [1, Result.Ok(1)],
      [0, Result.Ok(0)],
      [undefined, Result.Error(DecodeError({ message: 'Cannot decode undefined as number', input: undefined }))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as number', input: null }))],
    ],
    schema: () => ({ type: 'number' }),
  });
});
