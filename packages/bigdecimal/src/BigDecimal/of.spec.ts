import { describe, expect, it } from 'vitest';

import { BigDecimal } from './BigDecimal.js';
import { of } from './of.js';

describe(of, () => {
  it('constructs from parameters', () => {
    expect(of(1n, 100)).toEqual(
      BigDecimal.create({
        scale: 100,
        value: 1n,
      }),
    );
    expect(of(1n, -1)).toEqual(
      BigDecimal.create({
        scale: 0,
        value: 10n,
      }),
    );
  });
});
