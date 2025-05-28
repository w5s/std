import { describe, expect, it } from 'vitest';
import { BigDecimal } from './BigDecimal.js';
import { parse } from './BigDecimal/parse.js';
import { format } from './BigDecimal/format.js';
import { of } from './BigDecimal/of.js';
import { scale } from './BigDecimal/scale.js';
import { normalize } from './BigDecimal/normalize.js';
import { BigDecimalComparable } from './BigDecimal/BigDecimalComparable.js';
import { BigDecimalSigned } from './BigDecimal/BigDecimalSigned.js';
import { BigDecimalNumeric } from './BigDecimal/BigDecimalNumeric.js';
import { asString } from './BigDecimal/asString.js';
import { BigDecimalNegate } from './BigDecimal/BigDecimalNegate.js';

describe('BigDecimal', () => {
  it('is an alias to functions', () => {
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalComparable));
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalSigned));
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalNumeric));
    expect(BigDecimal).toEqual(expect.objectContaining(BigDecimalNegate));
    expect(BigDecimal).toEqual(
      expect.objectContaining({
        asString,
        compare: expect.any(Function),
        format,
        normalize,
        of,
        parse,
        scale,
      }),
    );
  });
});
