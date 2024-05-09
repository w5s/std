import { describe, it, expect } from 'vitest';
import { concat } from './concat.js';

describe(concat, () => {
  it('should join all parts', () => {
    expect(concat(['a', 'b', 'c'])).toEqual('abc');
  });
});
