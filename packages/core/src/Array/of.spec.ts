import { describe, expect, it } from 'vitest';
import { of } from './of.js';

describe(of, () => {
  it('should return empty array when no argument', () => {
    expect(of()).toEqual([]);
  });
  it('should return an array of items', () => {
    expect(of(1, 2, 3)).toEqual([1, 2, 3]);
  });
});
