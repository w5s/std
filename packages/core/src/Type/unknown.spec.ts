import { describe } from 'vitest';

import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { unknown } from './unknown.js';

describe('unknown', () => {
  describeType(unknown, () => ({
    instances: [0, null, undefined, 'hello world', {}, []],
    notInstances: [],
    typeName: 'unknown',
  }));
  describeCodec(unknown, () => ({
    decode: [
      ['', Result.Ok('')],
      ['hello world', Result.Ok('hello world')],
      [undefined, Result.Ok(undefined)],
      [null, Result.Ok(null)],
    ],
    encode: [
      ['', ''],
      [true, true],
      [null, null],
    ],
    schema: { type: 'any' },
  }));
});
