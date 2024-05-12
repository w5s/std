import { describe, expect, it } from 'vitest';
import { scale } from './scale.js';
import { BigDecimal } from '../Type/BigDecimal.js';

describe(scale, () => {
  it('returns identity if scale is the same', () => {
    const value = BigDecimal('3.0005');
    expect(scale(value, value.scale)).toStrictEqual(value);
  });
  it('returns a down scaled BigDecimal', () => {
    const value = BigDecimal('3.0005');
    expect(scale(value, 3)).toStrictEqual(BigDecimal('3.000'));
  });
  it('returns an upper scaled BigDecimal', () => {
    const value = BigDecimal('3.0005');
    expect(scale(value, 5)).toStrictEqual(BigDecimal('3.00050'));
  });
});
