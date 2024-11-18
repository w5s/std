import { describe, it, expect } from 'vitest';
import { create } from './create.js';

describe(create, () => {
  it('should create a new instance', () => {
    expect(create(['foo'])).toEqual(['foo']);
  });
  it('should collapse strings', () => {
    expect(create(['foo', 'bar', { $ref: 'var' }, 'baz', '!'])).toEqual(['foobar', { $ref: 'var' }, 'baz!']);
  });
});
