import { describe, expect, it } from 'vitest';

import { truncate } from './truncate.js';

describe(truncate, () => {
  it('handles empty strings', () => {
    expect(truncate('', { maxLength: 0 })).toBe('');
    expect(truncate('', { maxLength: 1 })).toBe('');
  });
  it('keeps original string if it is shorter than the length', () => {
    expect(truncate('abc', { ellipsis: '...', maxLength: 3 })).toBe('abc');
  });
  it('handles length', () => {
    expect(truncate('abc', { ellipsis: '...', maxLength: 1 })).toBe('...');
    expect(truncate('abc', { ellipsis: '...', maxLength: 2 })).toBe('...');
  });
  it('handles custom ellipsis', () => {
    expect(truncate('abc', { ellipsis: 'XX', maxLength: 1 })).toBe('XX');
  });
  it('truncates string to specified length', () => {
    expect(truncate('Hello World', { maxLength: 4 })).toBe('H...');
    expect(truncate('Hello World', { maxLength: 5 })).toBe('He...');
  });
  it('truncates to 30 characters by default', () => {
    expect(truncate('Hello World')).toBe('Hello World');
    /* cSpell:disable */
    expect(truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum.')).toBe(
      'Lorem ipsum dolor sit amet,...',
    );
    /* cSpell:enable */
  });
});
