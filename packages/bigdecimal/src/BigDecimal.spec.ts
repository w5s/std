import { describe, expect, it } from 'vitest';

import { BigDecimal } from './BigDecimal.js';
import { BigDecimalAsString } from './BigDecimal/BigDecimalAsString.js';
import { BigDecimalComparable } from './BigDecimal/BigDecimalComparable.js';
import { BigDecimalNegate } from './BigDecimal/BigDecimalNegate.js';
import { BigDecimalNumeric } from './BigDecimal/BigDecimalNumeric.js';
import { BigDecimalSigned } from './BigDecimal/BigDecimalSigned.js';
import { BigDecimalZero } from './BigDecimal/BigDecimalZero.js';
import { format } from './BigDecimal/format.js';
import { fromBigInt } from './BigDecimal/fromBigInt.js';
import { fromInt } from './BigDecimal/fromInt.js';
import { normalize } from './BigDecimal/normalize.js';
import { of } from './BigDecimal/of.js';
import { parse } from './BigDecimal/parse.js';
import { scale } from './BigDecimal/scale.js';
import { truncate } from './BigDecimal/truncate.js';

describe('BigDecimal', () => {
  it('is an alias to functions', () => {
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalAsString));
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalComparable));
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalSigned));
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalNumeric));
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalNegate));
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalZero));
    expect(BigDecimal).toEqual(
      expect.objectContaining({
        compare: expect.any(Function),
        format,
        fromBigInt,
        fromInt,
        normalize,
        of,
        parse,
        scale,
        truncate,
      }),
    );
  });
});
