import { describe, expect, it } from 'vitest';
import { Type } from './Type.js';
import { define } from './Type/define.js';

describe('Type', () => {
  it('is an alias to functions', () => {
    expect(Type).toEqual({
      define,
    });
  });
});
