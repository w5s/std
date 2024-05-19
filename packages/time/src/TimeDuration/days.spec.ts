import { describe, it, expect } from 'vitest';
import { days } from './days.js';

describe(days, () => {
  it('should return an int value', () => {
    expect(days(1)).toBe(1000 * 60 * 60 * 24);
  });
});
