import { describe, it, expect } from 'vitest';
import { format } from './format.js';
import { Time } from './Time.js';

describe(format, () => {
  it('should return a valid string ISO representation', () => {
    expect(format(Time(0))).toBe('1970-01-01T00:00:00.000Z');
    expect(format(Time(1_622_120_111_480))).toBe('2021-05-27T12:55:11.480Z');
  });
});
