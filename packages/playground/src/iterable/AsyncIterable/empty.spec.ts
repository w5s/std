import { describe, it, expect } from 'vitest';
import { empty } from './empty.js';
import { withAsyncIterable } from '../Testing.js';

describe(empty, () => {
  const expectAsyncIterable = withAsyncIterable(expect);

  it('should return empty', async () => {
    await expectAsyncIterable(empty()).toHaveValues([]);
  });
  it('should be idempotent', async () => {
    const source = empty();
    await expectAsyncIterable(source).toBeIdemPotent();
  });
});
