import { describe, expect, it } from 'vitest';

import { Order } from './Order.js';
import { combine } from './Order/combine.js';
import { compareBy } from './Order/compareBy.js';
import { primitive } from './Order/primitive.js';
import { reverse } from './Order/reverse.js';

describe('Order', () => {
  it('is an alias to functions', () => {
    expect(Order).toEqual(
      expect.objectContaining({
        combine,
        compareBy,
        primitive,
        reverse,
      }),
    );
  });
});
