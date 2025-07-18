import { describe, expect, it } from 'vitest';
import { chunks } from './chunks.js';
import { withAsyncIterable } from '../Testing.js';
import { from } from './from.js';

describe(chunks, () => {
  const expectIterable = withAsyncIterable(expect);

  it('returns an empty iterable for empty input', async () => {
    const result = chunks(from([]), 1);
    await expectIterable(result).toHaveValues([]);
  });
  it('returns an iterable of chunks', async () => {
    const result = chunks(from([1, 2, 3, 4, 5, 6, 7]), 2);
    await expectIterable(result).toHaveValues([[1, 2], [3, 4], [5, 6], [7]]);
  });
});
