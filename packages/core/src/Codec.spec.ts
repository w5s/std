import { describe, expect, it } from 'vitest';

import { Codec } from './Codec.js';
import { decode } from './Codec/decode.js';
import { encode } from './Codec/encode.js';
import { lazy } from './Codec/lazy.js';
import { schema } from './Codec/schema.js';

describe('Codec', () => {
  it('is an alias to functions', () => {
    expect(Codec).toEqual({
      decode,
      encode,
      lazy,
      schema,
    });
  });
});
