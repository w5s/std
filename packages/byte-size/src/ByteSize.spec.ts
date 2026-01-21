import { describe, it, expect } from 'vitest';
import { ByteSize } from './ByteSize.js';
import { format } from './ByteSize/format.js';
import { parse } from './ByteSize/parse.js';
import { ByteSizeZero } from './ByteSize/ByteSizeZero.js';

describe(ByteSize, () => {
  it('contains alias to functions', () => {
    expect(ByteSize).toEqual(expect.objectContaining(ByteSizeZero));
    expect(ByteSize).toEqual(
      expect.objectContaining({
        parse,
        format,
      }),
    );
  });
});
