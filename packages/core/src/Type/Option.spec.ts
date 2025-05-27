import { describe, expect, it } from 'vitest';
import { Option } from './Option.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { None } from '../Option/None.js';
import { define } from './define.js';
import { Symbol } from '../Symbol.js';

describe(Option, () => {
  const subject = Option;
  const AnyType = define<string>({
    typeName: 'AnyType',
    hasInstance: (_) => typeof _ === 'string',
    [Symbol.encode]: (_) => `_${_}`,
    [Symbol.decode]: (input, { ok, error }) =>
      typeof input === 'string' && input[0] === '_' ? ok(input.slice(1)) : error(input, 'UnderscoreString'),
    [Symbol.schema]: () => ({ type: 'any', format: 'custom_underscore' }),
  });

  describeType({ describe, it, expect })(subject(AnyType), {
    typeName: 'Option<AnyType>',
    instances: () => [undefined, ''],
    notInstances: () => [null, 1],
  });
  describeCodec({ describe, it, expect })(subject(AnyType), {
    decode: [
      [undefined, Result.Ok(None)],
      [null, Result.Ok(None)],
      ['_', Result.Ok('')],
      ['_abc', Result.Ok('abc')],
    ],
    encode: [
      [None, null],
      ['', '_'],
      ['abc', '_abc'],
    ],
    schema: () => ({ type: 'any', format: 'custom_underscore' }),
  });
});
