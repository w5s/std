import { describe, expect, it } from 'vitest';
import { decode } from './decode.js';
import { Result } from '../Result.js';

describe(decode, () => {
  it('should call codecEncode', () => {
    const codec = {
      codecDecode: (_: unknown) => Result.Ok(`test_${_}`),
    };
    expect(decode(codec, 'value')).toEqual(Result.Ok('test_value'));
  });
});
