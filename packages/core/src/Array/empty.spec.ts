import { describe, expect, it } from 'vitest';
import { empty } from './empty.js';

describe(empty, () => {
  it('should return an array with no element', () => {
    expect(empty()).toEqual([]);
  });
  it('should same instance', () => {
    const emptyRef = empty();
    expect(empty()).toBe(emptyRef);
  });
});
