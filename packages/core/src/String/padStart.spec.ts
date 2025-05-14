import { describe, it, expect } from 'vitest';
import { padStart } from './padStart.js';

describe(padStart, () => {
  it('should use custom padString when specified', () => {
    expect(padStart('abc', 7, '1234')).toBe('1234abc');
  });
});
