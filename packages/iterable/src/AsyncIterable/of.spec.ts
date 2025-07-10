import { describe, it, expect } from 'vitest';
import { of } from './of.js';
import { withAsyncIterable } from '../Testing.js';

describe(of, () => {
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should return an empty iterable when 0', async () => {
    await expectAsyncIterable(of()).toHaveValues([]);
  });
  it('should use mapFn(index) to generate values', async () => {
    await expectAsyncIterable(of(1, 2, 3)).toHaveValues([1, 2, 3]);
  });
});
