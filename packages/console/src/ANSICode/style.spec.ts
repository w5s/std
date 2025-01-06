/* cSpell:disable */
import { describe, it, expect } from 'vitest';
import { style } from './style.js';

describe(style, () => {
  it('applies color style', () => {
    const styleFunction = style({ color: 'red' });
    expect(styleFunction('foo')).toMatchInlineSnapshot(`"[31mfoo[39m"`);
  });

  it('applies fontWeight style', () => {
    const styleFunction = style({ fontWeight: 'bold' });
    expect(styleFunction('foo')).toMatchInlineSnapshot(`"[1mfoo[22m"`);
  });

  it('applies fontStyle style', () => {
    const styleFunction = style({ fontStyle: 'italic' });
    expect(styleFunction('foo')).toMatchInlineSnapshot(`"[3mfoo[23m"`);
  });

  it('applies multiple styles', () => {
    const styleFunction = style({ color: 'green', fontStyle: 'italic', fontWeight: 'bold' });
    expect(styleFunction('foo')).toMatchInlineSnapshot(`"[1m[3m[32mfoo[39m[23m[22m"`);
  });
});
