import { describe, expect, it } from 'vitest';
import { join } from './join.js';

describe(join, () => {
  it('should join all parts', () => {
    expect(join('|', ['a', 'b', 'c'])).toEqual('a|b|c');
  });
});
