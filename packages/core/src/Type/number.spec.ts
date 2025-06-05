import { describe } from 'vitest';
import { number } from './number.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';

describe('Number', () => {
  describeType(number, {
    typeName: 'number',
    instances: () => [1, 1],
    notInstances: () => ['', null, undefined],
  });
  describeCodec(number, () => ({
    encode: [
      [1, 1],
      [0, 0],
    ],
    decode: [
      [1, Result.Ok(1)],
      [0, Result.Ok(0)],
      [undefined, Result.Error(new CodecError({ message: 'Cannot decode undefined as number', input: undefined }))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as number', input: null }))],
    ],
    schema: { type: 'number' },
  }));
});
