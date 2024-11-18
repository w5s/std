import { describe, it, expect } from 'vitest';
import { of } from './of.js';

describe(of, () => {
  it('should create a new instance', () => {
    expect(of('foo')).toEqual(['foo']);
  });
  it('should collapse strings', () => {
    expect(of('foo', 'bar', { $ref: 'var' }, 'baz', '!')).toEqual(['foobar', { $ref: 'var' }, 'baz!']);
  });
});
