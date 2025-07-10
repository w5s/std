import { describe, it, expect } from 'vitest';
import { Iterable } from '@w5s/iterable';
import { hasInstance } from './hasInstance.js';
import { of as Seq } from './of.js';

describe(hasInstance, () => {
  it('returns true if the value is a Seq', () => {
    expect(hasInstance(Seq())).toBe(true);
  });
  it('returns false if the value is not a Seq', () => {
    expect(hasInstance([])).toBe(false);
    expect(hasInstance(Iterable.empty())).toBe(false);
  });
});
