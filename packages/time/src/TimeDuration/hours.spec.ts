import { describe, it, expect } from 'vitest';
import { hours } from './hours.js';

describe(hours, () => {
  it('should return an int value', () => {
    expect(hours(1)).toBe(1000 * 60 * 60);
  });
});
