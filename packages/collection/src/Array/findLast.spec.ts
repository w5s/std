import { describe, it, expect, vi } from 'vitest';
import { Option } from '@w5s/core';
import { findLast } from './findLast.js';

describe(findLast, () => {
  it('should map each value to callback', () => {
    const array = ['a', 'b', 'c'];
    vi.spyOn(array, 'findLast' as any);

    expect(findLast(array, (_) => _ === 'a')).toEqual('a');
    expect(findLast(array, (_) => _ === 'non_existent')).toEqual(Option.None);
  });
});
