import { describe } from 'vitest';
import { lazy } from './lazy.js';
import { Codec } from '../Codec.js';
import { Result } from '../Result.js';
import { describeCodec } from '../Testing.js';
import { Symbol } from '../Symbol.js';

describe(lazy, () => {
  const subject = lazy;
  const getCodec = (): Codec<string> => ({
    [Symbol.encode]: (_) => `__${_}`,
    [Symbol.decode]: (_) => Result.Ok(String(_).slice(2)),
    [Symbol.schema]: () => ({ type: 'string', format: 'test' }),
  });
  describeCodec(subject(getCodec), {
    encode: [['a', '__a']],
    decode: [['__a', Result.Ok('a')]],
    schema: () => ({ type: 'string', format: 'test' }),
  });
});
