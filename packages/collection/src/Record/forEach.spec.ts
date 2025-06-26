import { describe, expect, it, vi } from 'vitest';
import { forEach } from './forEach.js';

describe(forEach, () => {
  it('should return an array of keys', () => {
    const fn = vi.fn();
    const record = { anyKey: 'anyValue', anyOtherKey: 'anyOtherValue' };
    forEach(record, fn);
    expect(fn.mock.calls).toEqual([
      ['anyValue', 'anyKey', record],
      ['anyOtherValue', 'anyOtherKey', record],
    ]);
  });
});
