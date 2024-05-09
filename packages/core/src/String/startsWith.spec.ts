import { describe, expect, it } from 'vitest';
import { startsWith } from './startsWith.js';

describe(startsWith, () => {
  it('should return true only when starting', () => {
    const string = 'abc';

    expect(startsWith(string, '')).toEqual(true);
    expect(startsWith(string, 'ab')).toEqual(true);
    expect(startsWith(string, 'bc')).toEqual(false);
  });
});
