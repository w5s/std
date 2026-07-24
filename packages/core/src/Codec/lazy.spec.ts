import { describe } from 'vitest';

import { Codec } from '../Codec.js';
import { Result } from '../Result.js';
import { Symbol } from '../Symbol.js';
import { describeCodec } from '../Testing.js';
import { lazy } from './lazy.js';

describe(lazy, () => {
  const subject = lazy;
  const getCodec = (): Codec<string> => ({
    [Symbol.decode]: (_) => Result.Ok(String(_).slice(2)),
    [Symbol.encode]: (_) => `__${_}`,
    [Symbol.schema]: () => ({ format: 'test', type: 'string' }),
  });
  describeCodec(subject(getCodec), () => ({
    decode: [['__a', Result.Ok('a')]],
    encode: [['a', '__a']],
    schema: { format: 'test', type: 'string' },
  }));
});
