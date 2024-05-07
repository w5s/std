import { describe, it, expect } from 'vitest';
import { Codec } from './Codec.js';
import { decode } from './Codec/decode.js';
import { encode } from './Codec/encode.js';
import { schema } from './Codec/schema.js';
import { lazy } from './Codec/lazy.js';

describe('Codec', () => {
  it('is an alias to functions', () => {
    expect(Codec).toEqual({
      decode,
      encode,
      schema,
      lazy,
    });
  });
});
