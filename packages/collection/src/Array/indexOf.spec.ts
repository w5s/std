import { Option } from '@w5s/core';
import { describe, expect, it } from 'vitest';

import { indexOf } from './indexOf.js';

describe(indexOf, () => {
  it('should return index of element', () => {
    const array = ['a', '', 'a', '', 'a'];
    expect(indexOf(array, 'a', 1)).toEqual(2);
  });
  it('should work with NaN', () => {
    const array = ['a', NaN, 'a', '', 'a'];

    expect(indexOf(array, NaN)).toEqual(1);
  });
  it('should return Option.None when not found', () => {
    const array = ['a', 'b', 'c'];
    expect(indexOf(array, 'non_existent', 1)).toEqual(Option.None);
  });
});
