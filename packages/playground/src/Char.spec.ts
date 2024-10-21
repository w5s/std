import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe, it, expect } from 'vitest';
import { DecodeError, Result } from '@w5s/core';
import { Char } from './Char.js';

describe(Char, () => {
  describeType({ describe, it, expect })(Char, {
    typeName: 'Char',
    instances: () => [Char('a'), Char('b')],
    notInstances: () => [null, undefined, 'ab', 2],
  });
  describeCodec({ describe, it, expect })(Char, {
    decode: [
      ['a', Result.Ok(Char('a'))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as Char', input: null }))],
    ],
    encode: [
      [Char('a'), 'a'],
      [Char('A'), 'A'],
    ],
    schema: () => ({
      type: 'string',
      minLength: 1,
      maxLength: 1,
    }),
  });
});
