import { describe, it, expect } from 'vitest';
import { BigInt } from './BigInt.js';
import { parse } from './BigInt/parse.js';
import { format } from './BigInt/format.js';
import { BigIntComparable } from './BigInt/BigIntComparable.js';
import { Type } from './Type.js';
import { BigIntSigned } from './BigInt/BigIntSigned.js';
import { BigIntNumeric } from './BigInt/BigIntNumeric.js';
import { fromInt } from './BigInt/fromInt.js';
import { fromNumber } from './BigInt/fromNumber.js';

describe('BigInt', () => {
  it('is an alias to functions', () => {
    expect(BigInt).toEqual(expect.objectContaining(BigIntComparable));
    expect(BigInt).toEqual(expect.objectContaining(BigIntSigned));
    expect(BigInt).toEqual(expect.objectContaining(BigIntNumeric));
    expect(BigInt).toEqual(expect.objectContaining(Type.bigint));
    expect(BigInt).toEqual(
      expect.objectContaining({
        parse,
        format,
        fromInt,
        fromNumber,
      }),
    );
  });
});
