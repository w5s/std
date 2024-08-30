import { describe, it, expect } from 'vitest';
import { Boolean } from './Boolean.js';
import { BooleanComparable } from './Boolean/BooleanComparable.js';
import { Type } from './Type.js';

describe('Boolean', () => {
  it('is an alias to functions', () => {
    expect(Boolean).toEqual(expect.objectContaining(BooleanComparable));
    expect(Boolean).toEqual(expect.objectContaining(Type.boolean));
  });
});
