import { Option } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import { findIndex } from './findIndex.js';

describe(findIndex, () => {
  it('should map each value to callback', () => {
    const array = ['a', 'b', 'c'];

    expect(findIndex(array, (_) => _ === 'a')).toEqual(0);
    expect(findIndex(array, (_) => _ === 'non_existent')).toEqual(Option.None);
  });
});
