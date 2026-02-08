import { describe, it, expect } from 'vitest';
import { Type } from '@w5s/core';
import { BigInt } from './BigInt.js';
import { parse } from './BigInt/parse.js';
import { format } from './BigInt/format.js';
import { BigIntComparable } from './BigInt/BigIntComparable.js';
import { BigIntIntegral } from './BigInt/BigIntIntegral.js';
import { BigIntIndexable } from './BigInt/BigIntIndexable.js';
import { fromInt } from './BigInt/fromInt.js';
import { fromNumber } from './BigInt/fromNumber.js';

describe('BigInt', () => {
  it('is an alias to functions', () => {
    expect(BigInt).toEqual(expect.objectContaining(BigIntComparable));
    expect(BigInt).toEqual(expect.objectContaining(BigIntIntegral));
    expect(BigInt).toEqual(expect.objectContaining(BigIntIndexable));
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
