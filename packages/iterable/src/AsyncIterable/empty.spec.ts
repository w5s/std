import { describe, expect, it } from 'vitest';

import { withAsyncIterable } from '../Testing.js';
import { empty } from './empty.js';

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
