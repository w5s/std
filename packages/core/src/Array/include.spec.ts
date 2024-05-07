import { describe, expect, it } from 'vitest';
import { includes } from './includes.js';

describe(includes, () => {
  it('should map each value to callback', () => {
    const array = ['a', '', 'a', '', 'a'];

    expect(includes(array, 'a', 1)).toEqual(true);
    expect(includes(array, 'absent')).toEqual(false);
  });
  it('should work with NaN', () => {
    const array = ['a', Number.NaN, 'a', '', 'a'];

    expect(includes(array, Number.NaN)).toEqual(true);
  });
});
