import { describe } from 'vitest';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';
import { describeCodec, describeType } from '../Testing.js';
import { Char } from './Char.js';

describe(Char, () => {
  describeType(Char, () => ({
    typeName: 'Char',
    instances: [Char('a'), Char('b')],
    notInstances: [null, undefined, 'ab', 2],
  }));
  describeCodec(Char, () => ({
    decode: [
      ['a', Result.Ok(Char('a'))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as Char', input: null }))],
    ],
    encode: [
      [Char('a'), 'a'],
      [Char('A'), 'A'],
    ],
    schema: {
      type: 'string',
      minLength: 1,
      maxLength: 1,
    },
  }));
});
