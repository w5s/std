import { describe, it, expect } from 'vitest';
import { empty } from './empty.js';
import { withIterable } from '../Testing.js';

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
