import { describe, it, expect } from 'vitest';
import { Order } from './Order.js';
import { reverse } from './Order/reverse.js';
import { combine } from './Order/combine.js';
import { primitive } from './Order/primitive.js';
import { compareBy } from './Order/compareBy.js';

describe('Order', () => {
  it('is an alias to functions', () => {
    expect(Order).toEqual(
      expect.objectContaining({
        compareBy,
        combine,
        primitive,
        reverse,
      }),
    );
  });
});
