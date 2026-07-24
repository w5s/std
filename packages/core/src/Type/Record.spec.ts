import { describe } from 'vitest';

import type { Type } from '../Type.js';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { bigint } from './bigint.js';
import { Record } from './Record.js';
import { string } from './string.js';

describe(Record, () => {
  const subject = Record;

  const TestRecord = subject(string, bigint);
  type TestRecord = Type.TypeOf<typeof TestRecord>;

  describeType(TestRecord, () => ({
    instances: [{ bar: 2n, foo: 1n }, { key: 1n, value: 3n }, {}] as Array<TestRecord>,
    notInstances: [null, 1, [1]],
    typeName: 'Record<string,bigint>',
  }));
  describeCodec(TestRecord, () => ({
    decode: [
      [{}, Result.Ok({})],
      [{ bar: '2n', foo: '1n' }, Result.Ok({ bar: 2n, foo: 1n })],
      [
        ['a', '1'],
        Result.Error(
          new CodecError({
            input: ['a', '1'],
            message: 'Cannot decode a,1 as Record<string,bigint>',
          }),
        ),
      ],
    ],
    encode: [
      [{}, {}],
      [
        { bar: 2n, foo: 1n },
        { bar: '2n', foo: '1n' },
      ],
    ],
    schema: { type: 'object' },
  }));
});
