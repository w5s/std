import { describe, expect, it } from 'vitest';
import { of } from './of.js';
import { BigDecimal } from './BigDecimal.js';

describe(of, () => {
  it('constructs from parameters', () => {
    expect(of(1n, 100)).toEqual(
      BigDecimal.create({
        value: 1n,
        scale: 100,
      }),
    );
  });
});
