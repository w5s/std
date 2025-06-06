import { describe } from 'vitest';
import { Record } from './Record.js';
import { describeType, describeCodec } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';
import { bigint } from './bigint.js';
import { string } from './string.js';
import type { Type } from '../Type.js';

describe(Record, () => {
  const subject = Record;

  const TestRecord = subject(string, bigint);
  type TestRecord = Type.TypeOf<typeof TestRecord>;

  describeType(TestRecord, () => ({
    typeName: 'Record<string,bigint>',
    instances: [{ foo: 1n, bar: 2n }, { key: 1n, value: 3n }, {}] as TestRecord[],
    notInstances: [null, 1, [1]],
  }));
  describeCodec(TestRecord, () => ({
    decode: [
      [{}, Result.Ok({})],
      [{ foo: '1n', bar: '2n' }, Result.Ok({ foo: 1n, bar: 2n })],
      [
        ['a', '1'],
        Result.Error(
          new CodecError({
            message: 'Cannot decode a,1 as Record<string,bigint>',
            input: ['a', '1'],
          }),
        ),
      ],
    ],
    encode: [
      [{}, {}],
      [
        { foo: 1n, bar: 2n },
        { foo: '1n', bar: '2n' },
      ],
    ],
    schema: { type: 'object' },
  }));
});
