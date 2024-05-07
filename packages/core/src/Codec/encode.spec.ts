import { describe, expect, it } from 'vitest';
import { encode } from './encode.js';

describe(encode, () => {
  it('should call codecEncode', () => {
    const codec = {
      codecEncode: (_: string) => `test_${_}`,
    };
    expect(encode(codec, 'value')).toEqual('test_value');
  });
});
