import { describe, it, expect } from 'vitest';
import { Result } from '@w5s/core';
import { DecodeError } from '../DecodeError.js';
import { describeCodec, describeType } from '../Testing.js';
import { URL } from './URL.js';

describe('URL', () => {
  const anyValidURL = 'http://localhost:3000/my/path?get=1' as URL;

  describeType({ describe, it, expect })(URL, {
    typeName: 'URL',
    instances: () => [anyValidURL],
    notInstances: () => [null, ''],
  });
  describeCodec({ describe, it, expect })(URL, {
    decode: [
      [anyValidURL, Result.Ok(anyValidURL)],
      [
        '',
        Result.Error(
          DecodeError({
            message: 'Cannot decode  as URL',
            input: null,
          })
        ),
      ],
      [
        null,
        Result.Error(
          DecodeError({
            message: 'Cannot decode null as URL',
            input: null,
          })
        ),
      ],
    ],
    encode: [[anyValidURL, anyValidURL]],
    schema: () => ({
      type: 'string',
      format: 'url',
    }),
  });
});