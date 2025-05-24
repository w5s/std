import { describe, expect, it } from 'vitest';
import { truncate } from './truncate.js';

describe(truncate, () => {
  it('handles empty strings', () => {
    expect(truncate('', { maxLength: 0 })).toBe('');
    expect(truncate('', { maxLength: 1 })).toBe('');
  });
  it('keeps original string if it is shorter than the length', () => {
    expect(truncate('abc', { maxLength: 3, ellipsis: '...' })).toBe('abc');
  });
  it('handles length', () => {
    expect(truncate('abc', { maxLength: 1, ellipsis: '...' })).toBe('...');
    expect(truncate('abc', { maxLength: 2, ellipsis: '...' })).toBe('...');
  });
  it('handles custom ellipsis', () => {
    expect(truncate('abc', { maxLength: 1, ellipsis: 'XX' })).toBe('XX');
  });
  it('truncates string to specified length', () => {
    expect(truncate('Hello World', { maxLength: 4 })).toBe('H...');
    expect(truncate('Hello World', { maxLength: 5 })).toBe('He...');
  });
  it('truncates to 30 characters by default', () => {
    expect(truncate('Hello World')).toBe('Hello World');
    expect(truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum.')).toBe(
      'Lorem ipsum dolor sit amet,...',
    );
  });
});
