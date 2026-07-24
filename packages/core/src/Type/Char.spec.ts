import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { Char } from './Char.js';

describe(Char, () => {
  describeType(Char, () => ({
    instances: [Char('a'), Char('b')],
    notInstances: [null, undefined, 'ab', 2],
    typeName: 'Char',
  }));
  describeCodec(Char, () => ({
    decode: [
      ['a', Result.Ok(Char('a'))],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as Char' }))],
    ],
    encode: [
      [Char('a'), 'a'],
      [Char('A'), 'A'],
    ],
    schema: {
      maxLength: 1,
      minLength: 1,
      type: 'string',
    },
  }));
});
