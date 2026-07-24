import { describe } from 'vitest';

import { None } from '../Option/None.js';
import { Result } from '../Result.js';
import { Symbol } from '../Symbol.js';
import { describeCodec, describeType } from '../Testing.js';
import { define } from './define.js';
import { Option } from './Option.js';

describe(Option, () => {
  const subject = Option;
  const AnyType = define<string>({
    hasInstance: (_) => typeof _ === 'string',
    [Symbol.decode]: (input, { error, ok }) =>
      typeof input === 'string' && input[0] === '_' ? ok(input.slice(1)) : error(input, 'UnderscoreString'),
    [Symbol.encode]: (_) => `_${_}`,
    [Symbol.schema]: () => ({ format: 'custom_underscore', type: 'any' }),
    typeName: 'AnyType',
  });

  describeType(subject(AnyType), () => ({
    instances: [undefined, ''],
    notInstances: [null, 1],
    typeName: 'Option<AnyType>',
  }));
  describeCodec(subject(AnyType), () => ({
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
    schema: { format: 'custom_underscore', type: 'any' },
  }));
});
