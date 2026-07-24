import { describe, expect, it } from 'vitest';

import { of } from './of.js';
import { size } from './size.js';

describe(size, () => {
  it('should return reduce for each value using initialValue', () => {
    const source = of(1, 3, 2);

    expect(size(source)).toEqual(3);
  });
});
