import { describe, it, expect } from 'vitest';
import { findLastIndex } from './findLastIndex.js';
import { Option } from '../Option.js';

describe(findLastIndex, () => {
  it('should map each value to callback', () => {
    const array = ['a', 'b', 'c'];

    expect(findLastIndex(array, (_) => _ === 'a')).toEqual(0);
    expect(findLastIndex(array, (_) => _ === 'non_existent')).toEqual(Option.None);
  });
});
