import { describe, it, expect } from 'vitest';
import { anyOf } from './anyOf.js';
import { $Object } from './Object.js';
import { String } from './String.js';
import { Number } from './Number.js';
import { describeCodec, describeType } from '../Testing.js';

describe(anyOf, () => {
  const AType = $Object(
    {
      a: String,
    },
    'AType'
  );
  const BType = $Object(
    {
      b: Number,
    },
    'BType'
  );
  const ABType = anyOf(AType, BType);

  describeType({ describe, it, expect })(ABType, {
    typeName: 'AType|BType',
    instances: () => [{ a: 'a_value' }, { b: 1 }],
    notInstances: () => [undefined, null, { a: 1 }],
  });
  describeCodec({ describe, it, expect })(ABType, {
    encode: [
      // [0n, '0n'],
      // [1n, '1n'],
    ],
    decode: [
      // ['1n', Result.Ok(1n)],
      // ['-2n', Result.Ok(-2n)],
      // ['2', Result.Error(DecodeError({ message: 'Cannot decode 2 as BigInt', input: '2' }))],
      // ['2.1n', Result.Error(DecodeError({ message: 'Cannot decode 2.1n as BigInt', input: '2.1n' }))],
      // [undefined, Result.Error(DecodeError({ message: 'Cannot decode undefined as BigInt', input: undefined }))],
      // [null, Result.Error(DecodeError({ message: 'Cannot decode null as BigInt', input: null }))],
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
          properties: {
            b: {
              type: 'number',
            },
          },
          required: [],
          type: 'object',
        },
      ],
    }),
  });
});
