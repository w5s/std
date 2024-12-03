import { describe, it, expect, vi } from 'vitest';
import { find } from './find.js';
import { create } from './create.js';
import { of } from './of.js';

describe(find, () => {
  it('should find first matching element', async () => {
    const source = of('a', 'b', 'c');
    const result = await find(source, (value) => value !== 'a');
    expect(result).toBe('b');
  });

  it('should return undefined when no element matches', async () => {
    const source = of('a', 'b', 'c');
    const result = await find(source, (value) => value === 'unknown');
    expect(result).toBe(undefined);
  });

  it('should stop iteration after finding match', async () => {
    let iterationCount = 0;
    const source = create(async function* iterate() {
      for (let i = 1; i <= 10; i += 1) {
        iterationCount += 1;
        yield i;
      }
    });
    await find(source, (x) => x === 5);
    expect(iterationCount).toBe(5);
  });
  it('calls callback with parameters', async () => {
    const source = of('a', 'b', 'c');
    const callback = vi.fn(() => false);
    await find(source, callback);
    expect(callback.mock.calls).toEqual([
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ]);
  });
});
