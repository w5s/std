import { describe, it, expect } from 'vitest';
import { format } from './format.js';

describe(format, () => {
  it('returns a formatted string', () => {
    expect(format([1, 2], 'm')).toBe('\u{1B}[1;2m');
  });
});
