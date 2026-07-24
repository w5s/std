import { Result } from '@w5s/core';
import { describe } from 'vitest';

import { CodecError } from '../CodecError.js';
import { describeCodec, describeType } from '../Testing.js';
import { URL } from './URL.js';

describe('URL', () => {
  const anyValidURL = 'http://localhost:3000/my/path?get=1' as URL;

  describeType(URL, () => ({
    instances: [anyValidURL],
    notInstances: [null, ''],
    typeName: 'URL',
  }));
  describeCodec(URL, () => ({
    decode: [
      [anyValidURL, Result.Ok(anyValidURL)],
      [
        '',
        Result.Error(
          new CodecError({
            input: '',
            message: 'Cannot decode "" as URL',
          }),
        ),
      ],
      [
        null,
        Result.Error(
          new CodecError({
            input: null,
            message: 'Cannot decode null as URL',
          }),
        ),
      ],
    ],
    encode: [[anyValidURL, anyValidURL]],
    schema: {
      format: 'url',
      type: 'string',
    },
  }));
});
