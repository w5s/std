import { describe, expect, it } from 'vitest';

import { Result } from '../Result.js';
import { Symbol } from '../Symbol.js';
import { decode } from './decode.js';

describe(decode, () => {
  it('should call __encode__', () => {
    const codec = {
      [Symbol.decode]: (_: unknown) => Result.Ok(`test_${_}`),
    };
    expect(decode(codec, 'value')).toEqual(Result.Ok('test_value'));
  });
});
