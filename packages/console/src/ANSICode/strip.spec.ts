/* cSpell:disable */
import { describe, it, expect } from 'vitest';
import { strip } from './strip.js';

describe(strip, () => {
  it('strip color from string', () => {
    expect(strip('\u{1B}[0m\u{1B}[4m\u{1B}[42m\u{1B}[31mfoo\u{1B}[39m\u{1B}[49m\u{1B}[24mfoo\u{1B}[0m')).toBe('foofoo');
  });

  it('strip color from ls command', () => {
    expect(strip('\u{1B}[00;38;5;244m\u{1B}[m\u{1B}[00;38;5;33mfoo\u{1B}[0m')).toBe('foo');
  });

  it('strip reset;setfg;setbg;italics;strike;underline sequence from string', () => {
    expect(strip('\u{1B}[0;33;49;3;9;4mbar\u{1B}[0m')).toBe('bar');
  });

  it('strip link from terminal link', () => {
    expect(strip('\u{1B}]8;;https://github.com\u{7}click\u{1B}]8;;\u{7}')).toBe('click');
  });
});
