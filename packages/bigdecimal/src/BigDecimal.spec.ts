import { describe, expect, it } from 'vitest';
import { BigDecimal } from './BigDecimal.js';
import { parse } from './BigDecimal/parse.js';
import { format } from './BigDecimal/format.js';
import { of } from './BigDecimal/of.js';
import { scale } from './BigDecimal/scale.js';
import { normalize } from './BigDecimal/normalize.js';

describe('BigDecimal', () => {
  it('is an alias to functions', () => {
    expect(BigDecimal).toEqual(
      expect.objectContaining({
        compare: expect.any(Function),
        format,
        normalize,
        of,
        parse,
        scale,
      })
    );
  });
});
