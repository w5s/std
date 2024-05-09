import { describe, expect, it } from 'vitest';
import { split } from './split.js';

describe(split, () => {
  it('should split all parts', () => {
    expect(split('a|b|c', '|')).toEqual(['a', 'b', 'c']);
    expect(split('a|b|c', '|', 2)).toEqual(['a', 'b']);
  });
});
