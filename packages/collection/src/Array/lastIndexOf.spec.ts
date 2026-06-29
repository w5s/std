import { describe, expect, it } from 'vitest';
import { Option } from '@w5s/core';
import { lastIndexOf } from './lastIndexOf.js';

describe(lastIndexOf, () => {
  it('should map each value to callback', () => {
    const array = ['a', '', 'a', '', 'a'];

    expect(lastIndexOf(array, 'a', 1)).toEqual(0);
  });
  it('should work with NaN', () => {
    const array = ['a', NaN, 'a', NaN, 'a'];

    expect(lastIndexOf(array, NaN)).toEqual(3);
  });
  it('should return Option.None when not found', () => {
    const array = ['a', 'b', 'c'];
    expect(lastIndexOf(array, 'non_existent', 1)).toEqual(Option.None);
  });
});
