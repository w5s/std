import { describe, it, expect, vi } from 'vitest';
import { of } from './of.js';
import { some } from './some.js';

describe(some, () => {
  it('returns true when every elements satisfies the given predicate', async () => {
    const source = of(1, 3, 2);

    await expect(some(source, (value) => value > 1)).resolves.toBe(true);
    await expect(some(source, (value) => value < 0)).resolves.toBe(false);
  });
  it('calls callback with parameters', async () => {
    const source = of('a', 'b', 'c');
    const callback = vi.fn(() => false);
    await some(source, callback);
    expect(callback.mock.calls).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
  });
});
