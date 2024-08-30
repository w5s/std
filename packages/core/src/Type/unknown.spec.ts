import { describe, it, expect } from 'vitest';
import { unknown } from './unknown.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';

describe('unknown', () => {
  describeType({ describe, it, expect })(unknown, {
    typeName: 'unknown',
    instances: () => [0, null, undefined, 'hello world', {}, []],
    notInstances: () => [],
  });
  describeCodec({ describe, it, expect })(unknown, {
    encode: [
      ['', ''],
      [true, true],
      [null, null],
    ],
    decode: [
      ['', Result.Ok('')],
      ['hello world', Result.Ok('hello world')],
      [undefined, Result.Ok(undefined)],
      [null, Result.Ok(null)],
    ],
    schema: () => ({ type: 'any' }),
  });
});
