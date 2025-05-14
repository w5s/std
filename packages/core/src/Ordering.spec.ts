import { describe, it, expect } from 'vitest';
import { Ordering } from './Ordering.js';
import { Ordering as OrderingType } from './Type/Ordering.js';

describe('Ordering', () => {
  it('is an alias to functions', () => {
    expect(Ordering).toEqual(expect.objectContaining(OrderingType));
    // expect(Ordering).toEqual(expect.objectContaining({}));
  });
});
