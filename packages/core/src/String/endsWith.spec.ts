import { describe, it, expect } from 'vitest';
import { endsWith } from './endsWith.js';

describe(endsWith, () => {
  it('should return true only when starting', () => {
    const string = 'abc';

    expect(endsWith(string, '')).toEqual(true);
    expect(endsWith(string, 'ab')).toEqual(false);
    expect(endsWith(string, 'bc')).toEqual(true);
  });
});
