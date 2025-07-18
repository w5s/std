import { describe, expect, it } from 'vitest';
import { chunks } from './chunks.js';
import { withIterable } from '../Testing.js';

describe(chunks, () => {
  const expectIterable = withIterable(expect);

  it('returns an empty iterable for empty input', () => {
    const result = chunks([], 1);
    expectIterable(result).toHaveValues([]);
  });
  it('returns an iterable of chunks', () => {
    const result = chunks([1, 2, 3, 4, 5, 6, 7], 2);
    expectIterable(result).toHaveValues([[1, 2], [3, 4], [5, 6], [7]]);
  });
});
