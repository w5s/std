import { describe, it, expect } from 'vitest';
import { BigInt } from './BigInt.js';
import { parse } from './BigInt/parse.js';
import { format } from './BigInt/format.js';
import { BigIntComparable } from './BigInt/BigIntComparable.js';
import { Type } from './Type.js';
import { BigIntSigned } from './BigInt/BigIntSigned.js';
import { BigIntNumeric } from './BigInt/BigIntNumeric.js';

describe('BigInt', () => {
  it('is an alias to functions', () => {
    expect(BigInt).toEqual(expect.objectContaining(BigIntComparable));
    expect(BigInt).toEqual(expect.objectContaining(BigIntSigned));
    expect(BigInt).toEqual(expect.objectContaining(BigIntNumeric));
    expect(BigInt).toEqual(expect.objectContaining(Type.BigInt));
    expect(BigInt).toEqual(
      expect.objectContaining({
        parse,
        format,
      })
    );
  });
});
