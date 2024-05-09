import { describe, it, expect } from 'vitest';
import { includes } from './includes.js';

describe(includes, () => {
  it('should return true only when present', () => {
    const string = 'abc';

    expect(includes(string, '')).toEqual(true);
    expect(includes(string, 'ab')).toEqual(true);
    expect(includes(string, 'abc')).toEqual(true);
    expect(includes(string, 'abcd')).toEqual(false);
    expect(includes(string, 'absent')).toEqual(false);
  });
});
