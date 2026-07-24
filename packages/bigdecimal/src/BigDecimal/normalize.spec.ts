import { describe, expect, it } from 'vitest';

import { BigDecimal } from './BigDecimal.js';
import { normalize } from './normalize.js';

describe(normalize, () => {
  it('returns a normalized value (i.e. with no trailing 0 scale)', () => {
    expect(normalize(BigDecimal('0'))).toEqual(BigDecimal(0n, 0));
    expect(normalize(BigDecimal('0.123000'))).toEqual(BigDecimal(123n, 3));
    expect(normalize(BigDecimal('123.000'))).toEqual(BigDecimal(123n, 0));
    expect(normalize(BigDecimal('-0.000123000'))).toEqual(BigDecimal(-123n, 6));
    expect(normalize(BigDecimal('-123.000'))).toEqual(BigDecimal(-123n, 0));
    expect(normalize(BigDecimal('12300000'))).toEqual(BigDecimal(123n, -5));
    expect(normalize(BigDecimal.create({ scale: -1, value: 123n }))).toEqual(
      BigDecimal.create({ scale: 0, value: 1230n }),
    );
  });
});
