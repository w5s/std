import { describe, it, expect, expectTypeOf } from 'vitest';
import { RoundingMode } from './RoundingMode.js';

describe('RoundingMode', () => {
  it('has values', () => {
    expect(RoundingMode).toMatchSnapshot();

    type ExpectedRoundingModes = Exclude<Intl.NumberFormatOptions['roundingMode'], undefined>;

    const value = RoundingMode.Trunc as unknown as RoundingMode;
    expectTypeOf(value).toEqualTypeOf<ExpectedRoundingModes>();
  });
});
