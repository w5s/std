import { describe, expect, it } from 'vitest';

import { Boolean } from './Boolean.js';
import { BooleanComparable } from './Boolean/BooleanComparable.js';
import { BooleanNot } from './Boolean/BooleanNot.js';
import { Type } from './Type.js';

describe('Boolean', () => {
  it('is an alias to functions', () => {
    expect(Boolean).toEqual(expect.objectContaining(BooleanComparable));
    expect(Boolean).toEqual(expect.objectContaining(Type.boolean));
    expect(Boolean).toEqual(expect.objectContaining(BooleanNot));
  });
});
