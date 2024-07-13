import { describe, expect, it } from 'vitest';
import { lazy } from './lazy.js';
import { Codec } from '../Codec.js';
import { Result } from '../Result.js';
import { describeCodec } from '../Testing.js';

describe(lazy, () => {
  const subject = lazy;
  const getCodec = (): Codec<string> => ({
    codecEncode: (_) => `__${_}`,
    codecDecode: (_) => Result.Ok(String(_).slice(2)),
    codecSchema: () => ({ type: 'string', format: 'test' }),
  });
  describeCodec({ describe, it, expect })(subject(getCodec), {
    encode: [['a', '__a']],
    decode: [['__a', Result.Ok('a')]],
    schema: () => ({ type: 'string', format: 'test' }),
  });
});
