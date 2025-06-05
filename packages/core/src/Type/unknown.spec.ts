import { describe } from 'vitest';
import { unknown } from './unknown.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';

describe('unknown', () => {
  describeType(unknown, {
    typeName: 'unknown',
    instances: () => [0, null, undefined, 'hello world', {}, []],
    notInstances: () => [],
  });
  describeCodec(unknown, () => ({
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
    schema: { type: 'any' },
  }));
});
