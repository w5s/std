import { describe, expect, it } from 'vitest';
import { encode } from './encode.js';
import { Symbol } from '../Symbol.js';

describe(encode, () => {
  it('should call __encode__', () => {
    const codec = {
      [Symbol.encode]: (_: string) => `test_${_}`,
    };
    expect(encode(codec, 'value')).toEqual('test_value');
  });
});
