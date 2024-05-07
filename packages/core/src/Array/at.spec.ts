import { describe, expect, it } from 'vitest';
import { at } from './at.js';
import { Option } from '../Option.js';

describe(at, () => {
  it('should return Option.None when index is not defined', () => {
    expect(at([1], 1)).toBe(Option.None);
  });
  it('should return element at index', () => {
    expect(at([1], 0)).toBe(1);
  });
  it('should return last when negative', () => {
    expect(at([1, 2], -1)).toBe(2);
  });
});
