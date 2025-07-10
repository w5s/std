import { describe, it, expect, vi } from 'vitest';
import { of } from './of.js';
import { every } from './every.js';

describe(every, () => {
  it('returns true when every elements satisfies the given predicate', async () => {
    const source = of(1, 3, 2);

    await expect(every(source, (value) => value > 0)).resolves.toBe(true);
    await expect(every(source, (value) => value > 1)).resolves.toBe(false);
  });
  it('calls callback with parameters', async () => {
    const source = of('a', 'b', 'c');
    const callback = vi.fn(() => true);
    await every(source, callback);
    expect(callback.mock.calls).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
  });
});
