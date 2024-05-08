import { describe, it, expect } from 'vitest';
import { format } from './format.js';

describe(format, () => {
  it('should return a valid float', () => {
    expect(format(1.1)).toBe('1.1');
  });
});
