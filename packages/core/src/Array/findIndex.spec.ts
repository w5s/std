import { describe, it, expect } from 'vitest';
import { findIndex } from './findIndex.js';
import { Option } from '../Option.js';

describe(findIndex, () => {
  it('should map each value to callback', () => {
    const array = ['a', 'b', 'c'];

    expect(findIndex(array, (_) => _ === 'a')).toEqual(0);
    expect(findIndex(array, (_) => _ === 'non_existent')).toEqual(Option.None);
  });
});
