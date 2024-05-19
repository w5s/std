import { describe, it, expect } from 'vitest';
import { minutes } from './minutes.js';

describe(minutes, () => {
  it('should return an int value', () => {
    expect(minutes(1)).toBe(1000 * 60);
  });
});
