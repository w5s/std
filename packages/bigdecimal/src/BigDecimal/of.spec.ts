import { describe, expect, it } from 'vitest';
import { of } from './of.js';

describe(of, () => {
  it('constructs from parameters', () => {
    expect(of(1n, 100)).toEqual({
      _: 'BigDecimal',
      value: 1n,
      scale: 100,
    });
  });
});
