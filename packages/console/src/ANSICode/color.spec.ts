/* cSpell:disable */
import { describe, it, expect } from 'vitest';
import { color } from './color.js';

describe(color, () => {
  it('returns the ANSI escape sequence for the given color', () => {
    expect(color('red')('foo')).toBe('\u{1B}[31mfoo\u{1B}[39m');
    expect(color('green')('foo')).toBe('\u{1B}[32mfoo\u{1B}[39m');
    expect(color('blue')('foo')).toBe('\u{1B}[34mfoo\u{1B}[39m');
  });
});
