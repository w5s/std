import { Type } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import { BigInt } from './BigInt.js';
import { BigIntComparable } from './BigInt/BigIntComparable.js';
import { BigIntIndexable } from './BigInt/BigIntIndexable.js';
import { BigIntIntegral } from './BigInt/BigIntIntegral.js';
import { format } from './BigInt/format.js';
import { fromInt } from './BigInt/fromInt.js';
import { fromNumber } from './BigInt/fromNumber.js';
import { parse } from './BigInt/parse.js';

describe('BigInt', () => {
  it('is an alias to functions', () => {
    expect(BigInt).toEqual(expect.objectContaining(BigIntComparable));
    expect(BigInt).toEqual(expect.objectContaining(BigIntIntegral));
    expect(BigInt).toEqual(expect.objectContaining(BigIntIndexable));
    expect(BigInt).toEqual(expect.objectContaining(Type.bigint));
    expect(BigInt).toEqual(
      expect.objectContaining({
        format,
        fromInt,
        fromNumber,
        parse,
      }),
    );
  });
});
