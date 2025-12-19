import { describe, expect, it } from 'vitest';
import { entries } from './entries.js';

describe(entries, () => {
  it('should return an array of [key, value]', () => {
    expect(
      [...entries({
        anyKey: 'anyValue',
        anyOtherKey: 'anyOtherValue',
      })],
    ).toEqual([
      ['anyKey', 'anyValue'],
      ['anyOtherKey', 'anyOtherValue'],
    ]);
  });
  it('is idempotent', () => {
    const result = entries({
      anyKey: 'anyValue',
      anyOtherKey: 'anyOtherValue',
    });
    expect([...result]).toEqual([...result]);
  });
});
