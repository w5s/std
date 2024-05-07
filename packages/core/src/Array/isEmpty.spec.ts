import { describe, expect, it } from 'vitest';
import { isEmpty } from './isEmpty.js';

describe(isEmpty, () => {
  it('should return true when array is empty', () => {
    expect(isEmpty([])).toEqual(true);
  });
  it('should same instance', () => {
    expect(isEmpty([1])).toBe(false);
  });
});
