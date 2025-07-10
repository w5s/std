import { describe, it, expect, vi } from 'vitest';
import { of } from './of.js';
import { reduce } from './reduce.js';

describe(reduce, () => {
  it('should return reduce for each value using initialValue', async () => {
    const source = of(1, 3, 2);

    await expect(reduce(source, (acc, value) => acc + String(value), '')).resolves.toEqual('132');
    await expect(reduce(source, async (acc, value) => acc + String(value), '')).resolves.toEqual('132');
  });
  it('calls callback with parameters', async () => {
    const source = of('a', 'b', 'c');
    const callback = vi.fn(() => 'accumulator');
    await reduce(source, callback, 'initial');
    expect(callback.mock.calls).toEqual([
      ['initial', 'a', 0],
      ['accumulator', 'b', 1],
      ['accumulator', 'c', 2],
    ]);
  });
});
