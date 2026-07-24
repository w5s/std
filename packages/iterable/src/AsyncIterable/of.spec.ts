import { describe, expect, it } from 'vitest';

import { withAsyncIterable } from '../Testing.js';
import { of } from './of.js';

describe(of, () => {
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should return an empty iterable when 0', async () => {
    await expectAsyncIterable(of()).toHaveValues([]);
  });
  it('should use mapFn(index) to generate values', async () => {
    await expectAsyncIterable(of(1, 2, 3)).toHaveValues([1, 2, 3]);
  });
});
