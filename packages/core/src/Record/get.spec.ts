import { describe, expect, it } from 'vitest';
import { get } from './get.js';
import { Option } from '../Option.js';

describe(get, () => {
  it('should return undefined if key does not exist', () => {
    const record: Record<string, string> = { anyKey: 'anyValue' };
    expect(get(record, 'anyOtherKey')).toBe(Option.None);
  });
  it('should return value if key exist', () => {
    const record = { anyKey: 'anyValue' };
    expect(get(record, 'anyKey')).toBe('anyValue');
  });
});
