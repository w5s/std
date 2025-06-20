import { describe, it, expect } from 'vitest';
import { primitive } from './primitive.js';

describe(primitive, () => {
  it('returns a stable sort', () => {
    expect([true, false].toSorted(primitive)).toEqual([false, true]);
    expect([2, 1, 2, 5, -1].toSorted(primitive)).toEqual([-1, 1, 2, 2, 5]);
    expect([2n, 1n, 2n, 5n, -1n].toSorted(primitive)).toEqual([-1n, 1n, 2n, 2n, 5n]);
    expect(['a', 'v', 'ac', 'ab', 'zzz'].toSorted(primitive)).toEqual(['a', 'ab', 'ac', 'v', 'zzz']);
  });
});
