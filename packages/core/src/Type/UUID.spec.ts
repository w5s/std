import { describe } from 'vitest';
import { Result } from '@w5s/core';
import { CodecError } from '../CodecError.js';
import { describeCodec, describeType } from '../Testing.js';
import { UUID } from './UUID.js';

describe('UUID', () => {
  const anyValidUUID = '1c19548b-7cac-4222-b722-dc38f2870669' as UUID;

  describeType(UUID, () => ({
    typeName: 'UUID',
    instances: [anyValidUUID],
    notInstances: [null, anyValidUUID.slice(1)],
  }));
  describeCodec(UUID, () => ({
    decode: [
      [anyValidUUID, Result.Ok(anyValidUUID)],
      [
        null,
        Result.Error(
          new CodecError({
            message: 'Cannot decode null as UUID',
            input: null,
          }),
        ),
      ],
    ],
    encode: [[anyValidUUID, anyValidUUID]],
    schema: {
      type: 'string',
      format: 'uuid',
    },
  }));
});
