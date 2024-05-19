import { describe, it, expect } from 'vitest';
import { seconds } from './seconds.js';

describe(seconds, () => {
  it('should return an int value', () => {
    expect(seconds(1)).toBe(1000);
  });
});
