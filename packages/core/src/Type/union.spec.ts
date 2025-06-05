import { describe } from 'vitest';
import { union } from './union.js';
import { TObject } from './Object.js';
import { string } from './string.js';
import { number } from './number.js';
import { describeCodec, describeType } from '../Testing.js';
import { Result } from '../Result.js';
import { CodecError } from '../CodecError.js';

describe(union, () => {
  const AType = TObject(
    {
      a: string,
    },
    'AType',
  );
  const BType = string;
  const CType = number;
  const BCType = union(BType, CType);
  const ABCType = union(AType, BCType);

  describeType(ABCType, {
    typeName: 'AType|string|number',
    instances: () => [{ a: 'a_value' }, 1, 'a'],
    notInstances: () => [undefined, null, { a: 1 }],
  });
  describeCodec(ABCType, {
    encode: [
      [1, 1],
      ['a', 'a'],
      [{ a: 'va' }, { a: 'va' }],
    ],
    decode: [
      [1, Result.Ok(1)],
      ['a', Result.Ok('a')],
      [{ a: 'va' }, Result.Ok({ a: 'va' })],
      [
        { a: 1 },
        Result.Error(
          new CodecError({ message: 'Cannot decode [object Object] as AType|string|number', input: { a: 1 } }),
        ),
      ],
      [
        undefined,
        Result.Error(new CodecError({ message: 'Cannot decode undefined as AType|string|number', input: undefined })),
      ],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as AType|string|number', input: null }))],
    ],
    schema: () => ({
      anyOf: [
        {
          properties: {
            a: {
              type: 'string',
            },
          },
          required: [],
          type: 'object',
        },
        {
          type: 'string',
        },
        {
          type: 'number',
        },
      ],
    }),
  });
});
