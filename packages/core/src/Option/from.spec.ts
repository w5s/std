import { describe, expect, it } from 'vitest';
import { from } from './from.js';
import { None } from './None.js';

describe(from, () => {
  it('should return non null value', () => {
    expect(from(null)).toBe(None);
    expect(from(undefined)).toBe(None);
    expect(from('foo')).toBe('foo');
  });
});
