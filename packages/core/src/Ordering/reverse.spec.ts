import { describe, it, expect } from 'vitest';
import { reverse } from './reverse.js';
import { Ordering } from '../Ordering.js';

describe(reverse, () => {
  it('inverts less and greater', () => {
    expect(reverse(Ordering.Equal)).toBe(Ordering.Equal);
    expect(reverse(Ordering.Greater)).toBe(Ordering.Less);
    expect(reverse(Ordering.Less)).toBe(Ordering.Greater);
  });
});
