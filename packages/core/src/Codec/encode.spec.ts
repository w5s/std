import { describe, expect, it } from 'vitest';

import { Symbol } from '../Symbol.js';
import { encode } from './encode.js';

describe(encode, () => {
  it('should call __encode__', () => {
    const codec = {
      [Symbol.encode]: (_: string) => `test_${_}`,
    };
    expect(encode(codec, 'value')).toEqual('test_value');
  });
});
