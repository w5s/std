import { describe, expect, it } from 'vitest';
import { truncate } from './truncate.js';

describe(truncate, () => {
  it('handles empty strings', () => {
    expect(truncate('', 0)).toBe('');
    expect(truncate('', 1)).toBe('');
  });
  it('keeps original string if it is shorter than the length', () => {
    expect(truncate('abc', 3, { ellipsis: '...' })).toBe('abc');
  });
  it('handles length', () => {
    expect(truncate('abc', 1, { ellipsis: '...' })).toBe('...');
    expect(truncate('abc', 2, { ellipsis: '...' })).toBe('...');
  });
  it('handles custom ellipsis', () => {
    expect(truncate('abc', 1, { ellipsis: 'XX' })).toBe('XX');
  });
  it('truncates string to specified length', () => {
    expect(truncate('Hello World', 4)).toBe('H...');
    expect(truncate('Hello World', 5)).toBe('He...');
  });
});
