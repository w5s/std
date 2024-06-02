import { describe, expect, it } from 'vitest';
import { set } from './set.js';

describe(set, () => {
  it('should set value for key', () => {
    const record: Record<string, string> = { anyKey: 'anyValue' };
    expect(set(record, 'anyOtherKey', 'anyOtherValue')).toEqual({
      anyKey: 'anyValue',
      anyOtherKey: 'anyOtherValue',
    });
  });
  it('should return unchanged dict if value is the same', () => {
    const record = { anyKey: 'anyValue' };
    expect(set(record, 'anyKey', 'anyValue')).toStrictEqual(record);
  });
});
