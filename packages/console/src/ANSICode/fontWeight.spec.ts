/* cSpell:disable */
import { describe, it, expect } from 'vitest';
import { fontWeight } from './fontWeight.js';

describe(fontWeight, () => {
  it('should return the ANSI escape code for "normal"', () => {
    const result = fontWeight('normal')('foo');
    expect(result).toBe('\u{1B}[22mfoo\u{1B}[22m');
  });

  it('should return the ANSI escape code for "bold"', () => {
    const result = fontWeight('bold')('foo');
    expect(result).toBe('\u{1B}[1mfoo\u{1B}[22m');
  });

  it('should return the ANSI escape code for "dim"', () => {
    const result = fontWeight('dim')('foo');
    expect(result).toBe('\u{1B}[2mfoo\u{1B}[22m');
  });
});
