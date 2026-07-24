import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { Result } from '../Result.js';
import { describeCodec, describeType } from '../Testing.js';
import { number } from './number.js';
import { TObject } from './Object.js';
import { string } from './string.js';
import { union } from './union.js';

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

  describeType(ABCType, () => ({
    instances: [{ a: 'a_value' }, 1, 'a'],
    notInstances: [undefined, null, { a: 1 }],
    typeName: 'AType|string|number',
  }));
  describeCodec(ABCType, () => ({
    decode: [
      [1, Result.Ok(1)],
      ['a', Result.Ok('a')],
      [{ a: 'va' }, Result.Ok({ a: 'va' })],
      [
        { a: 1 },
        Result.Error(
          new CodecError({ input: { a: 1 }, message: 'Cannot decode [object Object] as AType|string|number' }),
        ),
      ],
      [
        undefined,
        Result.Error(new CodecError({ input: undefined, message: 'Cannot decode undefined as AType|string|number' })),
      ],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as AType|string|number' }))],
    ],
    encode: [
      [1, 1],
      ['a', 'a'],
      [{ a: 'va' }, { a: 'va' }],
    ],
    schema: {
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
    },
  }));
});
