import { describe, expect, it } from 'vitest';
import { $delete } from './delete.js';

describe('.delete', () => {
  it('should return identity for empty dictionary', () => {
    const record: Record<string, string> = {};
    expect($delete(record, 'anyKey')).toBe(record);
  });
  it('should return identity if key is not found', () => {
    const record: Record<string, string> = { anyKey: 'anyValue' };
    expect($delete(record, 'anyOtherKey')).toBe(record);
  });
  it('should return a new dictionary without key', () => {
    const record = { anyKey: 'anyValue' };
    expect($delete(record, 'anyKey')).toEqual({});
  });
});
