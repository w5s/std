import { describe, expect, it } from 'vitest';

import { withIterable } from '../Testing.js';
import { empty } from './empty.js';

describe(empty, () => {
  const expectIterable = withIterable(expect);

  it('should return empty', () => {
    expectIterable(empty()).toHaveValues([]);
  });
  it('should be idempotent', () => {
    const source = empty();
    expectIterable(source).toBeIdemPotent();
  });
});
