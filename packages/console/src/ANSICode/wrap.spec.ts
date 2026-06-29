/* cSpell:disable */
import { describe, it, expect } from 'vitest';
import { wrap } from './wrap.js';

describe(wrap, () => {
  it('wrap string with color', () => {
    expect(wrap([1], 0, 'm')('foo')).toBe('\u{1B}[1mfoo\u{1B}[0m');
  });

  it('wrap string with multiple colors', () => {
    expect(wrap([1, 4, 42], 0, 'm')('foo')).toBe('\u{1B}[1;4;42mfoo\u{1B}[0m');
  });

  it('wrap string with no color', () => {
    expect(wrap([], 0, 'm')('foo')).toBe('foo');
  });
});
