import { describe, it, expect, vi } from 'vitest';
import { Array } from '@w5s/core';
import { map } from './map.js';
import { withAsyncIterable } from '../Testing.js';
import { of } from './of.js';

describe(map, () => {
  const expectAsyncIterable = withAsyncIterable(expect);
  it('should return a mapped iterator', async () => {
    const source = of(1, 3, 2);
    await expectAsyncIterable(map(source, (value) => value * 2)).toHaveValues([2, 6, 4]);
    await expectAsyncIterable(map(source, async (value) => value * 2)).toHaveValues([2, 6, 4]);
  });
  it('should be idempotent', async () => {
    const source = of(1, 3, 2);
    await expectAsyncIterable(map(source, (value) => value * 2)).toBeIdemPotent();
    await expectAsyncIterable(map(source, async (value) => value * 2)).toBeIdemPotent();
  });
  it('calls callback with parameters', async () => {
    const source = of('a', 'b', 'c');
    const callback = vi.fn(() => false);
    await Array.fromAsync(map(source, callback));
    expect(callback.mock.calls).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
  });
});
