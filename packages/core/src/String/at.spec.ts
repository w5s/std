import { describe, expect, it } from 'vitest';

import { Option } from '../Option.js';
import { at } from './at.js';

describe(at, () => {
  it('should return Option.None when index is not defined', () => {
    expect(at('a', 1)).toBe(Option.None);
  });
  it('should return element at index', () => {
    expect(at('abc', 0)).toBe('a');
  });
  it('should return last when negative', () => {
    expect(at('abc', -1)).toBe('c');
  });
});
