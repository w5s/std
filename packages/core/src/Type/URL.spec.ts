import { describe } from 'vitest';
import { Result } from '@w5s/core';
import { CodecError } from '../CodecError.js';
import { describeCodec, describeType } from '../Testing.js';
import { URL } from './URL.js';

describe('URL', () => {
  const anyValidURL = 'http://localhost:3000/my/path?get=1' as URL;

  describeType(URL, {
    typeName: 'URL',
    instances: () => [anyValidURL],
    notInstances: () => [null, ''],
  });
  describeCodec(URL, () => ({
    decode: [
      [anyValidURL, Result.Ok(anyValidURL)],
      [
        '',
        Result.Error(
          new CodecError({
            message: 'Cannot decode "" as URL',
            input: '',
          }),
        ),
      ],
      [
        null,
        Result.Error(
          new CodecError({
            message: 'Cannot decode null as URL',
            input: null,
          }),
        ),
      ],
    ],
    encode: [[anyValidURL, anyValidURL]],
    schema: {
      type: 'string',
      format: 'url',
    },
  }));
});
