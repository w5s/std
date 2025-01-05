/* cSpell:disable */
import { describe, it, expect } from 'vitest';
import { color } from './color.js';

describe(color, () => {
  it('returns the ANSI escape sequence for the given color', () => {
    expect(color('red')('foo')).toBe('\u001B[31mfoo\u001B[39m');
    expect(color('green')('foo')).toBe('\u001B[32mfoo\u001B[39m');
    expect(color('blue')('foo')).toBe('\u001B[34mfoo\u001B[39m');
  });
});
