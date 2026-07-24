import { Result } from '@w5s/core';
import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { describeCodec, describeType } from '../Testing.js';
import { UUID } from './UUID.js';

describe('UUID', () => {
  const anyValidUUID = '1c19548b-7cac-4222-b722-dc38f2870669' as UUID;

  describeType(UUID, () => ({
    instances: [anyValidUUID],
    notInstances: [null, anyValidUUID.slice(1)],
    typeName: 'UUID',
  }));
  describeCodec(UUID, () => ({
    decode: [
      [anyValidUUID, Result.Ok(anyValidUUID)],
      [
        null,
        Result.Error(
          new CodecError({
            input: null,
            message: 'Cannot decode null as UUID',
          }),
        ),
      ],
    ],
    encode: [[anyValidUUID, anyValidUUID]],
    schema: {
      format: 'uuid',
      type: 'string',
    },
  }));
});
