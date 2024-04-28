import { describe, expect, it } from 'vitest';
import { Type } from './Type.js';
import { define } from './Type/define.js';
import { String } from './String.js';
import { Number } from './Number.js';
import { Boolean } from './Boolean.js';

describe('Type', () => {
  it('is an alias to functions', () => {
    expect(Type).toEqual({
      define,
      Boolean,
      Number,
      String,
    });
  });
});
