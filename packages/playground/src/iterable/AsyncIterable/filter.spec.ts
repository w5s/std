import { describe, it, expect, vi } from 'vitest';
import { Array } from '@w5s/core';
import { filter } from './filter.js';
import { withAsyncIterable } from '../Testing.js';
import { of } from './of.js';

describe(filter, () => {
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should return a filtered iterator', async () => {
    const source = of(1, 3, 2);
    await expectAsyncIterable(filter(source, (value) => value >= 2)).toHaveValues([3, 2]);
    await expectAsyncIterable(filter(source, async (value) => value >= 2)).toHaveValues([3, 2]);
  });
  it('should be idempotent', async () => {
    const source = of(1, 3, 2);
    await expectAsyncIterable(filter(source, async (value) => value >= 2)).toBeIdemPotent();
  });
  it('calls callback with parameters', async () => {
    const source = of('a', 'b', 'c');
    const callback = vi.fn(() => false);
    await Array.fromAsync(filter(source, callback));
    expect(callback.mock.calls).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
  });
});
