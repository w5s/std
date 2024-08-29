import { describe, it, expect } from 'vitest';
import { union } from './union.js';
import { $Object } from './Object.js';
import { String } from './String.js';
import { Number } from './Number.js';
import { describeCodec, describeType } from '../Testing.js';
import { Result } from '../Result.js';
import { DecodeError } from '../DecodeError.js';

describe(union, () => {
  const AType = $Object(
    {
      a: String,
    },
    'AType'
  );
  const BType = String;
  const CType = Number;
  const BCType = union(BType, CType);
  const ABCType = union(AType, BCType);

  describeType({ describe, it, expect })(ABCType, {
    typeName: 'AType|String|Number',
    instances: () => [{ a: 'a_value' }, 1, 'a'],
    notInstances: () => [undefined, null, { a: 1 }],
  });
  describeCodec({ describe, it, expect })(ABCType, {
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
        Result.Error(DecodeError({ message: 'Cannot decode [object Object] as AType|String|Number', input: { a: 1 } })),
      ],
      [
        undefined,
        Result.Error(DecodeError({ message: 'Cannot decode undefined as AType|String|Number', input: undefined })),
      ],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as AType|String|Number', input: null }))],
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
