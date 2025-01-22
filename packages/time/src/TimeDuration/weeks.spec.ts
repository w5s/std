import { describe, it, expect } from 'vitest';
import { weeks } from './weeks.js';

describe(weeks, () => {
  it('should return an int value', () => {
    expect(weeks(1)).toBe(1000 * 60 * 60 * 24 * 7);
  });
});
