/* cSpell:disable */
import { describe, it, expect } from 'vitest';
import { fontStyle } from './fontStyle.js';

describe(fontStyle, () => {
  it('returns the ANSI escape code for "normal"', () => {
    expect(fontStyle('normal')('foo')).toBe('\u{1B}[23mfoo\u{1B}[23m');
  });

  it('returns the ANSI escape code for "italic"', () => {
    expect(fontStyle('italic')('foo')).toBe('\u{1B}[3mfoo\u{1B}[23m');
  });
});
