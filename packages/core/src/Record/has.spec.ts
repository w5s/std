import { describe, expect, it } from 'vitest';
import { has } from './has.js';

describe(has, () => {
  it('should return false if key does not exist', () => {
    const record: Record<string, string> = { anyKey: 'anyValue' };
    expect(has(record, 'anyOtherKey')).toBe(false);
  });
  it('should true if key exist', () => {
    const record = { anyKey: 'anyValue' };
    expect(has(record, 'anyKey')).toBe(true);
  });
});
