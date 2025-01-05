/* cSpell:disable */
import { describe, it, expect } from 'vitest';
import { strip } from './strip.js';

describe(strip, () => {
  it('strip color from string', () => {
    expect(strip('\u001B[0m\u001B[4m\u001B[42m\u001B[31mfoo\u001B[39m\u001B[49m\u001B[24mfoo\u001B[0m')).toBe('foofoo');
  });

  it('strip color from ls command', () => {
    expect(strip('\u001B[00;38;5;244m\u001B[m\u001B[00;38;5;33mfoo\u001B[0m')).toBe('foo');
  });

  it('strip reset;setfg;setbg;italics;strike;underline sequence from string', () => {
    expect(strip('\u001B[0;33;49;3;9;4mbar\u001B[0m')).toBe('bar');
  });

  it('strip link from terminal link', () => {
    expect(strip('\u001B]8;;https://github.com\u0007click\u001B]8;;\u0007')).toBe('click');
  });
});
